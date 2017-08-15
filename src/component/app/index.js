import React from 'react';
import {connect} from 'react-redux';
import * as querystring from 'querystring';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';
import * as route from '../../action/route-actions.js';

import Dictation from '../dictation';
import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';
import LoginContainer from '../login-container';

export class App extends React.Component {
  render(){
    if(this.props.token)
      this.props.goToLogin();
    let googleLoginBaseURL='https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined,
    });

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;
    return (
      <div className='app'>
        <BrowserRouter>
          <main>
            <header>
              <h1> Dictate It! </h1>
              {util.renderIf(this.props.token,
                <p>
                  <Link to='/landing'>Home</Link>
                  <Link to='/dictation'>New Dictation</Link>
                </p>
              )}
              {util.renderIf(!this.props.token,
                <p>
                  <Link to='/login'>Login</Link>
                  <a href={googleLoginURL}>Login with Google</a>
                  <Link to='/signup'>Sign Up</Link>
                </p>
              )}
            </header>
            <Route exact path='/login' component={LoginContainer} />
            <Route exact path='/signup' component={SignupContainer} />
            <Route exact path='/landing' component={LandingContainer} />
            <Route exact path='/dictation' component={Dictation} />
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  token: state.token,
  route: state.route,
});

let mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch(auth.login(token)),
  goToLogin: () => dispatch(route.switchRoute('/login')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
  goToLanding: () => dispatch(route.switchRoute('/landing')),
  goToNewDictation: () => dispatch(route.switchRoute('/dictation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
