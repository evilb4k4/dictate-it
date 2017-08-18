import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as auth from '../../action/auth-actions.js';
import * as querystring from 'querystring';
import {Redirect, Link} from 'react-router-dom';
import {Card, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import googleSVG from '../../assets/google.svg';


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

    const style ={
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
      button: {
        margin: 15,

      },
    };

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;
    return(
      <Card style={style.card} id="login-card">
        <div className='login-container'>
          <header>
            {util.renderIf(!this.props.token,
              <div className='login'>
                <RaisedButton
                  href={googleLoginURL}
                  label="Login with "
                  labelPosition="before"
                  primary={true}
                  fullWidth={false}
                  style={style.button}
                  icon={<img src={googleSVG} width={25} height={25}/>}
                />
                <br />
                OR
                <br />
                <RaisedButton label="Sign Up"
                  style={style.button}
                  containerElement={<Link to="/signup" />}
                  // linkButton={true} 
                />
                <br />
                  OR
                <br />
              </div>
            )}
          </header>
          {util.renderIf(this.props.token,
            <Redirect to='/landing' />
          )}
          <form className='login-form' onSubmit={this.handleSubmit}>
            <TextField
              style={style.inputs}
              name='username'
              hintText='username'
              fullWidth={false}
              value={this.state.username}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              style={style.inputs}
              name='password'
              hintText='password'
              fullWidth={false}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br />
            <div className='login-submit'>
              <RaisedButton type='submit' label="Submit" fullWidth={false} />
            </div>
          </form>
        </div>
      </Card>
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
