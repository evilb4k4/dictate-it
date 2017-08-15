import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';

class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      docId: '',
      created: Date.now(),
      editing: false,
      position: 2,
    };
    console.log('STATEMTN_____', props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({content: `${props.statement.final} ${props.statement.interim}`});
  }

  handleUpdate(event) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
    console.log('selection staaaaaaaaaaaaaaaaaaaart', event.target.selectionStart);
    console.log('e.target.selectionStart');
    // event.target.selectionStart = event.target.selectionEnd = 5;
  }

  render() {


    // console.log('lines', lines)
    return (
      <span>
        {util.renderIf(!this.state.editing,
          <p onClick={() => this.setState({editing: true})}>
            {this.state.content}
          </p>
        )}
        {util.renderIf(this.state.editing,
          <form onSubmit={this.handleUpdate}>
            <textarea
              autoFocus
              size={100}
              value={this.state.content}
              selectionStart={this.state.position}
              selectionEnd={this.state.position}
              name="content"
              onBlur={this.handleUpdate}
              onChange={this.handleChange}
            />

          </form>
        )}
      </span>
    );
  }
}

export default Statement;
