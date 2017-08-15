import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

export class LoginContainer extends React.Component {
  render(){
    if(this.props.token)
      this.props.goToLanding();
    return(
      <div className='login-container'>
        
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  route: state.route,
});

export const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(route.switchRoute('/login')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
  goToLanding: () => dispatch(route.switchRoute('/landing')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
