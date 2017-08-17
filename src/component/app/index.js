import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

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
    const muiTheme = getMuiTheme({
      palette: {
        textColor: cyan500,
      },
      appBar: {
        height: 50,
      },
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='app'>
          <BrowserRouter>
            <main>

              <Route exact path='/' component={LoginContainer} />
              <Route exact path='/signup' component={SignupContainer} />
              <Route exact path='/landing' component={LandingContainer} />
              <Route exact path='/dictation' component={Dictation} />
              <Route exact path='/dictation/*' component={Dictation} />

            </main>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
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
