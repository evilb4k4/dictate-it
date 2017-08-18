import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CoolGuy from 'material-ui/svg-icons/action/record-voice-over';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import FlatButton from 'material-ui/FlatButton';
import DrawerMenu from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Dictation from '../dictation';
import LandingContainer from '../landing-container';
import SignupContainer from '../signup-container';
import LoginContainer from '../login-container';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  componentWillMount() {
    let token = util.cookieFetch('Dictation-Token');
    util.log('token', token);
    if(token && token !== 'undefined')
      this.props.tokenSet(token);
  }

  render(){

    const styles = {
      title: {
        cursor: 'pointer',
      },
    };

    const muiTheme = getMuiTheme({
      // spacing: Spacing,
      fontFamily: 'Roboto, sans-serif',
      palette: {
        primaryColor: '#29B6F6',
        secondaryColor: '#039BE5',
        textColor: '#29B6F6',
      },
      appBar: {
        height: 65,
      },
      button: {
        primaryColor: '#29B6F6',
        secondaryColor: '#039BE5',
        margin: 15,
      },
      card: {
        height: '350px',
        width: '275px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '75px',
      },

      inputs: {
        width: '50%',
        margin: '0 auto',
      },
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='app'>
          <AppBar
            style={{backgroundColor: '#29B6F6'}}
            title={<span style={styles.title}>DICTATE IT</span>}
            iconElementLeft={<IconButton><CoolGuy /></IconButton>}
            // onTitleTouchTap={handleTouchTap}
            // iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            // iconElementRight={<FlatButton label="Save" />}
          />
          <div className="drawer">
            <RaisedButton
              label="Open Drawer"
              onClick={this.handleToggle}
            />
            <DrawerMenu
              open={this.state.open}
              docked={false}
              width={200}
              onRequestChange={(open) => this.setState({open})}
            >
              <MenuItem
                // containerElement={<Link to="/team" />}
                onClick={this.handleClose}>
                The Team
              </MenuItem>
              <MenuItem
                // containerElement={<Link to="/dictation/*" />}
                onClick={this.handleClose}>
                Browse Dictations
              </MenuItem>
            </DrawerMenu>
          </div>
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
  tokenSet: token => dispatch(auth.tokenSet(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
