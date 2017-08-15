import React from 'react';
import {connect} from 'react-redux';
import * as route from '../../action/route.js';
import * as querystring from 'querystring';
import * as util from '../../lib/util';

export class LandingContainer extends React.Component {
  render(){
    if(!this.props.token)
      this.props.goToLogin();
    return(
      <div className='landing-container'>
        
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(route.switchRoute('/login')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
  goToNewDictation: () => dispatch(route.switchRoute('/dictation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
