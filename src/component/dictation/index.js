import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import {dictationCreateRequest, dictationFetchOneRequest} from '../../action/dictation-actions.js';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dictation: {
        title: '',
        description: '',
        body: '',
      },
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let id = this.props.history.location.pathname.split('/')[2];
    util.log('url query', id);
    if(id)
      this.props.dictationFetchOne(id)
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ dictation: { [name]: value }});
  }

  handleSave(body) {
    let dictation = {
      body,
      title: this.state.dictation.title,
      description: this.state.dictation.description,
    };
    this.props.dictationCreate(dictation);
  }

  render() {
    return (
      <div className="live-dictation">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        {util.renderIf(this.props.dictation.title,
          <h2>{this.props.dictation.title}</h2>
        )}
        {util.renderIf(!this.props.dictation.title,
          <input
            type='text'
            name='title'
            onChange={this.handleChange}
            value={this.props.title}
            placeholder='Title'
          />
        )}
        {util.renderIf(this.props.dictation.description,
          <p>{this.props.dictation.description}</p>
        )}
        {util.renderIf(!this.props.dictation.description,
          <input
            type='text'
            name='description'
            onChange={this.handleChange}
            value={this.props.description}
            placeholder='Description'
          />
        )}
        <Listener dictation={this.props.dictation} onSave={this.handleSave} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  dictation: state.dictations,
});

export const mapDispatchToProps = (dispatch) => ({
  dictationCreate: dictation => dispatch(dictationCreateRequest(dictation)),
  dictationFetchOne: id => dispatch(dictationFetchOneRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dictation);
