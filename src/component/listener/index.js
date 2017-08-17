import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import AceEditor from 'react-ace';
import {dictationCreateRequest} from '../../action/dictation-actions.js';

import 'brace/mode/text';
import 'brace/theme/github';

export class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      final: props.dictation ? props.dictation.body : '',
      interim: '',
      title: props.dictation ? props.dictation.title : '',
      description: props.dictation ? props.dictation.description : '',
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartListening = this.handleStartListening.bind(this);
  }

  handleChange(event) {
    if(event.target) {
      let {name, value} = event.target;
      this.setState({ [name]: value });
    }
    else {
      this.setState({ final: event });
    }
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
      util.log('new dict', newDict)
    } else {
      newDict = {
        title: this.state.title,
        description: this.state.description,
        body: this.state.final,
      };
    }
    this.props.dictationCreate(newDict);
  }

  handleStartListening(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    this.setState({ listening: this.state.listening ? false : true });

    let final_transcript;
    let recognizing = false;
    let ignore_onend;
    let start_timestamp;

    recognition.onstart = function() {
      recognizing = true;
    };
    recognition.onerror = function(event) {
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
    recognition.onend = function() {
      util.log('__onend');
      if(!this.state.listening) {
        recognition = null;
        return;
      }
      recognition.start();
    };
    recognition.onresult = function(event) {
      util.log('__onresult');
      final_transcript = this.state.final;
      var interim_transcript = '\n';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += `\n${event.results[i][0].transcript}`;
        } else {
          interim_transcript += `${event.results[i][0].transcript}`;
        }
        util.log('RESULT', event.results[i][0].transcript);
      }
      try {
        final_transcript = capitalize(final_transcript);
      } catch(err) {
      }
      this.setState({final: final_transcript, interim: interim_transcript});
      util.log('__after onresult');
    };

    recognition.onresult = recognition.onresult.bind(this);
    recognition.onend = recognition.onend.bind(this);

    function resetVoiceRecog() {
      recognition.stop();
    }

    let first_char = /\S/;
    function capitalize(s) {
      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }

    recognition.start();
    setInterval(resetVoiceRecog, 7500);
    ignore_onend = true;
  }

  render() {
    return (
      <div>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        {util.renderIf(this.state.title,
          <h2>{this.state.title}</h2>
        )}
        {util.renderIf(!this.state.title,
          <input
            type='text'
            name='title'
            onChange={this.handleChange}
            value={this.state.title}
            placeholder='Title'
          />
        )}
        {util.renderIf(this.state.description,
          <p>{this.state.description}</p>
        )}
        {util.renderIf(!this.state.description,
          <input
            type='text'
            name='description'
            onChange={this.handleChange}
            value={this.state.description}
            placeholder='Description'
          />
        )}
        <button
          name='listener'
          onClick={this.handleStartListening}
          >
          {util.renderIf(!this.state.listening, 'Start Listening')}
          {util.renderIf(this.state.listening, 'Stop Listening')}
        </button>
        <button
          name='save-dictation'
          onClick={this.handleSave}
        >
          Save Dictation
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
});

export const mapDispatchToProps = (dispatch) => ({
  dictationCreate: dictation => dispatch(dictationCreateRequest(dictation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
