import React from 'react';
import {connect} from 'react-redux';
import * as querystring from 'querystring';
import * as util from '../../lib/util';
import {Redirect, Link} from 'react-router-dom';
import * as auth from '../../action/auth-actions.js';
import DictationContainer from '../dictation-container';

export class LandingContainer extends React.Component {
  render(){
    return (
      <div className='landing-container'>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        {util.renderIf(this.props.token,
          <p>
            <Link to='/landing'>Home</Link>
            <Link to='/dictation'>New Dictation</Link>
            <button onClick={this.props.logout}>Logout</button>
          </p>
        )}
        <DictationContainer />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({
logout: () => dispatch(auth.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
