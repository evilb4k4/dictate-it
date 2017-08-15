import React from 'react';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as route from '../../action/route.js';

import Dictation from '../dictation';
import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';

export class App extends React.Component {

  render(){

    return (
      <div className='app'>
        <main>
          <header>
            <h1> Dictate It! </h1>
            {util.renderIf(!this.props.token,
              <p>
                <button onClick={this.props.goToLogin}>Login</button>
                <button onClick={this.props.goToSignup}>Sign Up</button>
              </p>
            )}
            {util.renderIf(this.props.token,
              <p>
                <button onClick={this.props.goToLanding}>Home</button>
                <button onClick={this.props.goToNewDictation}>New Dictation</button>
              </p>
            )}
          </header>
          <Dictation />
        </main>

        <MemoryRouter>
          <Switch location={{pathname: this.props.route}}>
            <Route exact path='/' component={() => <p> Login </p>} />
            <Route exact path='/signup' component={SignupContainer} />
            <Route exact path='/landing' component={LandingContainer} />
            <Route exact path='/dictation' component={Dictation} />
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
  goToLogin: () => dispatch(route.switchRoute('/')),
  goToSignup: () => dispatch(route.switchRoute('/signup')),
  goToLanding: () => dispatch(route.switchRoute('/landing')),
  goToNewDictation: () => dispatch(route.switchRoute('/dictation')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
