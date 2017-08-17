import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import {dictationCreateRequest, dictationFetchOneRequest} from '../../action/dictation-actions.js';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let id = this.props.history.location.pathname.split('/')[2];

  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ dictation: { [name]: value }});
  }

  handleSave(body) {
    this.props.dictationCreate(body);
  }

  render() {
    let current = {};
    try {
      let id = this.props.history.location.pathname.split('/')[2];
      if(this.props.dictations) {
        this.props.dictations.forEach(dictation => {
          if(dictation._id === id)
            current = dictation;
        });
      }
    } catch(err) {

    }
    return (
      <div className="live-dictation">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        {util.renderIf(current.title,
          <h2>{current.title}</h2>
        )}
        {util.renderIf(!current.title,
          <input
            type='text'
            name='title'
            onChange={this.handleChange}
            value={current.title}
            placeholder='Title'
          />
        )}
        {util.renderIf(current.description,
          <p>{current.description}</p>
        )}
        {util.renderIf(!current.description,
          <input
            type='text'
            name='description'
            onChange={this.handleChange}
            value={current.description}
            placeholder='Description'
          />
        )}
        <Listener dictation={current} onSave={this.handleSave} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  dictations: state.dictations,
});

export const mapDispatchToProps = (dispatch) => ({
  dictationCreate: dictation => dispatch(dictationCreateRequest(dictation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dictation);
