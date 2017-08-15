import React from 'react';
import {connect} from 'react-redux';
import Dictation from '../dictation';
import {MemoryRouter, Switch, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';

export class App extends React.Component {

  render(){
    return (
      <div className='app'>
        <main>
          <header>
            <h1> Dictate It! </h1>
            <button onClick={this.props.goToLanding}>Home</button>
          </header>
          <Dictation />
        </main>

        <MemoryRouter>
          <Switch location={{pathname: this.props.route}}>
            <Route exact path='/signup' component={SignupContainer} />
            <Route exact path='/landing' component={LandingContainer} />
            <Route exact path='/login' component={() => <p> Login </p>} />
          </Switch>
        </MemoryRouter>
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
  goToLanding: () => dispatch(route.switchRoute('/landing')),
  goToLogin: () => dispatch(route.switchRoute('/login')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
