import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import Statement from '../statement';

export class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      statements: [],
      final: '',
      interim: '',
    };

    this.handleStartListening = this.handleStartListening.bind(this);
  }

  handleStartListening(event) {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    if(this.state.listening) {
      this.setState({ listening: false});
      recognition.stop();
      return;
    } else {
      this.setState({ listening: true });
    }

    let final_transcript = '';
    let recognizing = false;
    let ignore_onend;
    let start_timestamp;
    let statements = [];

    recognition.onstart = function() {
      recognizing = true;
    };
    recognition.onerror = function(event) {
      if (event.error == 'no-speech') {
        console.log('__no-speech');
        ignore_onend = true;
      }
      if (event.error == 'audio-capture') {
        console.log('__audio-capture');
        ignore_onend = true;
      }
      if (event.error == 'not-allowed') {
        console.log('__not-allowed');
        ignore_onend = true;
      }
    };
    recognition.onend = function() {
      console.log('__onend');
      recognition.start();
    };
    recognition.onresult = function(event) {
      console.log('__onresult');
      var interim_transcript = '\n';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += `\n${event.results[i][0].transcript}`;
        } else {
          interim_transcript += `${event.results[i][0].transcript}`;
        }
        console.log('RESULT', event.results[i][0].transcript);
      }
      final_transcript = capitalize(final_transcript);
      this.setState({final: linebreak(final_transcript), interim: linebreak(interim_transcript)});
      console.log('__after onresult');
    };

    recognition.onresult = recognition.onresult.bind(this);

    function resetVoiceRecog() {
      recognition.stop();
    }

    let two_line = /\n\n/g;
    let one_line = /\n/g;

    function linebreak(s) {
      return s.replace(two_line, '<p></p>');
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
    let lines = [];
    for(var i = 0; i < this.state.final.length; i += 80){
      lines.push(this.state.final.substring(i, i + 80));
    }
    console.log('lines',lines);
    return (
      <div>
        <button
          name='listener'
          onClick={this.handleStartListening}
        >
          {util.renderIf(!this.state.listening, 'Start Listening')}
          {util.renderIf(this.state.listening, 'Stop Listening')}
        </button>

        {lines.map((item, i) =>
          <Statement key={i} content={item} />
        )}

        <span>{this.state.interim}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = (getState, dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Listener);
