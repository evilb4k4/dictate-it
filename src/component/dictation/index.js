import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';
import {dictationCreateRequest} from '../../action/dictation-actions.js';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ dictation: { [name]: value }});
  }

  render() {
    let current = {}, id;
    try {
      id = this.props.history.location.pathname.split('/')[2];
      if(this.props.dictations) {
        this.props.dictations.forEach(dictation => {
          if(dictation._id === id)
            current = dictation;
        });
      }
    } catch(err) {
      util.logError(err);
    }
    return (
      <div className="live-dictation">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <Listener dictation={current} id={id} onSave={this.handleSave} />
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
