import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import {dictationCreateRequest} from '../../action/dictation-actions.js';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ [name]: value });
  }

  handleSave(body) {
    let dictation = {
      body,
      title: this.state.title,
      description: this.state.description,
    };
    this.props.dictationCreate(dictation);
  }

  render() {
    return (
      <div className="live-dictation">
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
        <Listener onSave={this.handleSave} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dictation);
