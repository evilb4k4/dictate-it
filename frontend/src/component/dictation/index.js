import React from 'react';
import {connect} from 'react-redux';
import Statement from '../statement';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      statements: [
        {
          content: 'dajsdl ajsldkjas; ldkjas;l dkjasldk asd', docId: 123,
        },
        {
          content: 'aaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa', docId: 214124124,
        },
        {
          content: 'qwerqwerqwerqwerqwe rwqer qwer qwerq wer', docId: 12312,
        },
      ],
    };
  }

  render() {
    return (
      <div className="live-dictation">
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        {
          this.state.statements.map((statement, i) =>
            <Statement statement={statement}  key={i} />
          )
        }
      </div>
    );
  }
}

export default Dictation;
