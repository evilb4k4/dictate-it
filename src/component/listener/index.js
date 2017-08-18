import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import AceEditor from 'react-ace';
import {dictationCreateRequest, dictationUpdateRequest} from '../../action/dictation-actions.js';
import * as edit from '../../action/edit-actions.js';

import 'brace/mode/text';
import 'brace/theme/github';

let timerId;

export class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      final: props.dictation.body ? props.dictation.body : '',
      interim: '',
      title: props.dictation.title ? props.dictation.title : '',
      description: props.dictation.description ? props.dictation.description : '',
      recognition: new webkitSpeechRecognition(),
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListener = this.handleListener.bind(this);
  }

  handleChange(event) {
    if(event.target) {
      let {name, value} = event.target;
      this.setState({ [name]: value });
    } else {
      this.setState({ final: event });
    }
    util.log(this.props.dictation)
    this.props.liveEdit({
      dictationId: this.props.dictation._id,
      body: this.state.final,
    });
  }
  
  shouldComponentUpdate(nextProps){
    if(nextProps.final == this.state.final)
      return false;
    return true;
  }

  handleSave(event) {
    event.preventDefault();
    util.log(this.props.dictation);
    let newDict;
    if(this.props.dictation && Object.keys(this.props.dictation).length !== 0) {
      newDict = {
        ...this.props.dictation,
        body: this.state.final,
      };
      this.props.dictationUpdate(newDict);
    } else {
      newDict = {
        title: this.state.title,
        description: this.state.description,
        body: this.state.final,
      };
      this.props.dictationCreate(newDict);
    }
  }

  handleListener(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    this.state.recognition.continuous = true;
    this.state.recognition.interimResults = true;

    this.setState({ listening: this.state.listening ? false : true });

    let final_transcript = '';
    let recognizing = false;
    let ignore_onend;
    let start_timestamp;

    this.state.recognition.onstart = function() {
      recognizing = true;
    };
    this.state.recognition.onerror = function(event) {
      if (event.error == 'no-speech') {
        util.log('__no-speech');
        ignore_onend = true;
      }
      if (event.error == 'audio-capture') {
        util.log('__audio-capture');
        ignore_onend = true;
      }
      if (event.error == 'not-allowed') {
        util.log('__not-allowed');
        ignore_onend = true;
      }
    };
    this.state.recognition.onend = function() {
      util.log('__onend');
      this.state.recognition.start();
    };
    this.state.recognition.onresult = function(event) {
      util.log('__onresult');
      final_transcript = this.state.final;
      let interim_transcript = '\n';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += `\n${event.results[i][0].transcript}`;
        } else {
          interim_transcript += `${event.results[i][0].transcript}`;
        }
        util.log('RESULT', event.results[i][0].transcript);
      }

      this.setState({final: final_transcript, interim: interim_transcript});
      this.props.liveEdit({
        dictationId: this.props.dictation._id,
        body: this.state.final,
      });
      this.forceUpdate();
      util.log('__after onresult');
    };

    function resetVoiceRecog() {
      this.state.recognition.stop();
    }

    this.state.recognition.onresult = this.state.recognition.onresult.bind(this);
    this.state.recognition.onend = this.state.recognition.onend.bind(this);
    this.state.recognition.onstart = this.state.recognition.onstart.bind(this);
    resetVoiceRecog = resetVoiceRecog.bind(this);

    try {
      this.state.recognition.start();
    } catch(err) {
      clearInterval(timerId);
      this.state.recognition.onend = () => null;
      return;
    }
    timerId = setInterval(resetVoiceRecog, 7500);
    ignore_onend = true;
  }

  render() {
    util.log(this.props.history)
    return (
      <div>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            required
            type='text'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
            placeholder='Title'
          />
          <input
            required
            type='text'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
            placeholder='Description'
          />
          <button
            name='save-dictation'
            onClick={this.handleSave}
          >
            Save Dictation
          </button>
        </form>
        <button
          name='listener'
          onClick={this.handleListener}
        >
          {util.renderIf(!this.state.listening, 'Start Listening')}
          {util.renderIf(this.state.listening, 'Stop Listening')}
        </button>

        <AceEditor
          name='final'
          mode='text'
          theme='github'
          width='100%'
          onChange={this.handleChange}
          editorProps={{$blockScrolling: true}}
          setOptions={{
            wrap: true,
            maxLines: Infinity,
            autoScrollEditorIntoView: true,
            wrapBehavioursEnabled: true,
            indentedSoftWrap: false,
            behavioursEnabled: false,
            showGutter: false,
            showLineNumbers: false,
            fontSize: 15,
          }}
          value={this.state.final}
        />
        <span>{this.state.interim}</span>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  edits: state.edits,
});

export const mapDispatchToProps = (dispatch) => ({
  dictationCreate: dictation => dispatch(dictationCreateRequest(dictation)),
  dictationUpdate: dictation => dispatch(dictationUpdateRequest(dictation)),
  liveEdit: dictation => dispatch(edit.edit(dictation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
