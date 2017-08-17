import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as auth from '../../action/auth-actions.js';
import {Redirect, Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as querystring from 'querystring';


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
    const styles = {

  };

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

        {util.renderIf(this.props.token,
          <Redirect to='/landing' />
        )}
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input
            required
            name='username'
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            required
            name='password'
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <MuiThemeProvider>
<<<<<<< HEAD
          <div className='login-submit'>
          <RaisedButton type='submit' label="Submit" fullWidth={true} />
          </div>
=======
            <div className='login-submit'>
              <RaisedButton type='submit' label="Submit" fullWidth={true} />
            </div>
>>>>>>> f3975072f5407e1b63d264bf1d4d2b0ffb316ec1
          </MuiThemeProvider>
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
