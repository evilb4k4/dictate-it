import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';

export class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.statement
      ? {...props.statement, created: Date.now(), editing: false}
      : {
        final: props.statement.final,
        interim: props.statement.interim,
        docId: '',
        created: Date.now(),
        editing: false,
      };
      console.log('STATEMTN_____', props)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUpdate(event) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <span>
        {util.renderIf(!this.state.editing,
          <p onClick={() => this.setState({editing: true})}>
            {this.state.content}
          </p>
        )}
        {util.renderIf(this.state.editing,
          <form onSubmit={this.handleUpdate}>
            <input
              autoFocus
              type="text"
              name="content"
              onBlur={this.handleUpdate}
              onChange={this.handleChange}
              value={this.state.content}
            />
          </form>
        )}
      </span>
    );
  }
}

export default Statement;
