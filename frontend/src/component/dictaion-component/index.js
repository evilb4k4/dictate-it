import React from 'react';
import {connect} from 'react-redux';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
  }
}
