import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as auth from '../../action/auth-actions.js';
import * as querystring from 'querystring';
import {Redirect, Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.props.login(this.state)
      .then(() => {
        util.log(this.props.history);
        util.log(this.props.match);
        util.log();
        this.props.history.push('/landing');
      })
      .catch(console.error);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ [name]: value });
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
    return(
      <div className='login-container'>
        <header>
          <h1> Dictate It </h1>
          {util.renderIf(this.props.token,
            <p>
              <Link to='/landing'>Home</Link>
              <Link to='/dictation'>New Dictation</Link>
              <button onClick={this.props.logout}>Logout</button>
            </p>
          )}
          {util.renderIf(!this.props.token,
            <div className='login'>
              <Link to='/'>Login</Link>
              <div className="g-signin2" data-onsuccess="onSignIn"><a href={googleLoginURL}>
                  Login with Google</a></div>
              <Link to='/signup'>Sign Up</Link>
            </div>
          )}
        </header>
        {util.renderIf(this.props.token,
          <Redirect to='/landing' />
        )}
        <form className='login-form' onSubmit={this.handleSubmit}>
          <TextField
            name='username'
            hintText='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextField
            name='password'
            hintText='password'
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div className='login-submit'>
            <RaisedButton type='submit' label="Submit" fullWidth={true} />
          </div>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(auth.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
