import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';

export default class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  startListening(event) {
    event.preventDefault();

  }

  render() {
    return (
      <div className="live-dictation">
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <Listener />
      </div>
    );
  }
}
