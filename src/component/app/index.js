import React from 'react';
import {connect} from 'react-redux';
import * as querystring from 'querystring';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';

import Dictation from '../dictation';
import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';
import LoginContainer from '../login-container';

export class App extends React.Component {

  componentWillMount() {
    let token = util.cookieFetch('Dictation-Token');
    util.log('token', token);
    if(token && token !== 'undefined')
      this.props.tokenSet(token);
  }

  render(){
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
                  <button onClick={this.props.logout}>Logout</button>
                </p>
              )}
              {util.renderIf(!this.props.token,
                <p>
                  <Link to='/'>Login</Link>
                  <a href={googleLoginURL}>Login with Google</a>
                  <Link to='/signup'>Sign Up</Link>
                </p>
              )}
            </header>
            <Route exact path='/' component={LoginContainer} />
            <Route exact path='/signup' component={SignupContainer} />
            <Route exact path='/landing' component={LandingContainer} />
            <Route exact path='/dictation' component={Dictation} />
            <Route exact path='/dictation/*' component={Dictation} />
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  token: state.token,
});

let mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
  tokenSet: token => dispatch(auth.tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
