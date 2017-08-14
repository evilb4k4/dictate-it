import React from 'react';
import {connect} from 'react-redux';

export class Statements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      doc_id: '',
      created: Date.now(),
    };
  }
}
