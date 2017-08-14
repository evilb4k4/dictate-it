import React from 'react';
import {connect} from 'react-redux';

export class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.statement
      ? {...props.statement, created: Date.now()}
      : {
        content: '',
        docId: '',
        created: Date.now(),
      };
  }

  render() {
    return (
      <p contenteditable={true}>
        {this.state.content}
      </p>
    );
  }
}

export default Statement;
