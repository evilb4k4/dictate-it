import React from 'react';
import AceEditor from 'react-ace';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Recorder from 'material-ui/svg-icons/hardware/keyboard-voice';
import {dictationCreateRequest, dictationUpdateRequest} from '../../action/dictation-actions.js';
import * as edit from '../../action/edit-actions.js';
import {dictationFetchAllRequest, dictationDeleteRequest} from '../../action/dictation-actions.js';
import superagent from 'superagent';

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
      // eslint-disable-next-line no-undef
      recognition: new webkitSpeechRecognition(),
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListener = this.handleListener.bind(this);
  }

  getUserFromToken(token) {
    return superagent.get(`${__API_URL__}/user`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        this.setState({ ownerId: res.body._id });
        return res;
      });
  }

  componentWillMount(){
    this.props.getAllDictations()
    this.getUserFromToken(this.props.token)
      .catch(err => util.logError(err));
  }

  componentWillReceiveProps(props) {
    util.log(Object.keys(props.dictation));
    if(!props.dictation || Object.keys(props.dictation) === 0) {

      // util.log(this.props.location.query)
      let param =   props.id;
      util.log('param', param);

      let dictation = props.dictations.filter(dictation => dictation._id === param)[0];
      this.setState({final: dictation.body})
      // this.setState(
      //   {
      //     final: thisDictation.body ? thisDictation.body : '',
      //     title: thisDictation.title ? thisDictation.title : '',
      //     description: thisDictation.description ? thisDictation.description : '',
      //   }
      // );
    }

  }

  handleChange(event) {
    if(event.target) {
      let {name, value} = event.target;
      this.setState({ [name]: value });
    } else {
      this.setState({ final: event });
    }
    util.log(this.props.dictation);
    this.props.liveEdit({
      dictationId: this.props.dictation._id,
      title: this.props.dictation.title,
      description: this.props.dictation.description,
      body: this.state.final,
    });
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.final == this.state.final)
      return false;
    // if(this.props.edits && this.props.edits.length > 0) {
    //   let edits = this.props.edits[this.props.edits.length - 1];
    //   this.setState({
    //     final: edits.body,
    //     title: edits.title,
    //     description: edits.description,
    //   });
    // }
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

    let resetVoiceRecog = () => {
      this.state.recognition.stop();
    };

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

    const style = {
      largeIcon: {
        width: 60,
        height: 60,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
      card: {
        height: '350px',
        width: '275px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '75px',
      },
      inputs: {
        width: '50%',
        margin: '0 auto',
      },
      button: {
        margin: 15,
      },
    };

    let param = this.props.id;
    util.log('param', param);

    let dictation = this.props.dictations.filter(dictation => dictation._id === param)[0];
    dictation = dictation || {}
    console.log('dictation', dictation)

    dictation.body = this.props.edits[this.props.edits.length - 1] ? this.props.edits[this.props.edits.length - 1].body : dictation.body;
    return (
      <div>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <form onSubmit={(event) => event.preventDefault()}>
          <div className='listening'>
            <IconButton
              iconStyle={style.largeIcon}
              style={style.large}
            >
              <Recorder />
              {util.renderIf(!this.state.listening, 'Start Listening')}
              {util.renderIf(this.state.listening, 'Stop Listening')}
            </IconButton>
            <TextField
              type='text'
              name='title'
              onChange={this.handleChange}
              value={dictation.title}
              placeholder='Title'
            />
            <br />
            <TextField
              type='text'
              name='description'
              onChange={this.handleChange}
              value={dictation.description}
              placeholder='Description'
            />
            <br />
            <div className='save-dictation'>
              <RaisedButton
                onClick={this.handleSave}
                type='submit'
                label="Save Dictation"
                style={style.button}
                fullWidth={false} />
            </div>
            <br />
          </div>
        </form>
        <br />
        <div className='editor'>
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
            value={this.state.final ? this.state.final : dictation.body}
          />
          <span>{this.state.interim}</span>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  edits: state.edits,
  dictations: state.dictations ? state.dictations : []
});

export const mapDispatchToProps = (dispatch) => ({
  dictationCreate: dictation => dispatch(dictationCreateRequest(dictation)),
  dictationUpdate: dictation => dispatch(dictationUpdateRequest(dictation)),
  liveEdit: dictation => dispatch(edit.edit(dictation)),
  getAllDictations: () => dispatch(dictationFetchAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
