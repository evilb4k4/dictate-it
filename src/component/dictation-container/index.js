import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {dictationFetchRequest} from '../../action/dictation-actions.js';
import * as util from '../../lib/util';

export class DictationContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dictations: [],
    };
  }
}

  componentWillMount(){
    this.props.dictationFetchRequest()
    .then(dictations) => {
      this.setState({dictations});
    });
  }

render() {
  return (
    <div className="dictation-container">
    {util.renderIf(!this.props.token,
        <Redirect to='/' />
    )}
    {this.state.dictations.map(dictation) => {
      return
      <p>
      {dictation.title}
      {dictation.description}
      </p>
    }
  }
    </div>

  )
}

export const mapStateToProps = (states) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({
  dictation: (user) => dispatch(auth.dictationFetchRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
