import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import superagent from 'superagent';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';
import {} from 'material-ui/styles/colors';
import {Redirect} from 'react-router-dom';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions} from 'material-ui/Card';

export class SignupContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailError: null,
      usernameError: null,
      passwordError: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.usernameError && !this.state.emailError && !this.state.passwordError){
      util.log('åæææææææå');
      return this.props.signup({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render(){
    const style ={
      card: {
        height: '60%',
        width: '40%',
        margin: '0 auto',
        textAlign: 'center',
      },

      inputs: {
        width: '50%',
        margin: '0 auto',
      },
      button: {
        margin: 15,

      },
      floatingLabelStyle: {
        color: '#29B6F6',
      },
      floatingLabelFocusStyle: {
        color: '#29B6F6',
      },
    };
    return(
      <Card style={style.card} id="signup-card">
        <div className='signup-container'>
          {util.renderIf(this.props.token,
            <Redirect to='/landing' />
          )}
          <form onSubmit={this.handleSubmit}>
            <TextField
              name='email'
              type='email'
              hintText='email'
              fullWidth={false}
              value={this.state.email}
              onChange={this.handleChange}
              floatingLabelStyle={{color: 'color: grey800'}}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            />
            <br />
            <TextField
              name='username'
              type='text'
              hintText='username'
              fullWidth={false}
              value={this.state.username}
              onChange={this.handleChange}
              floatingLabelStyle={{color: 'color: grey800'}}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            />
            <br />
            <TextField
              required
              name='password'
              type='password'
              hintText='password'
              fullWidth={false}
              value={this.state.password}
              onChange={this.handleChange}
              floatingLabelStyle={{color: 'color: grey800'}}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
            />
            <br />
            <div className='signup-submit'>
              <RaisedButton
                type='submit'
                label="Submit"
                style={style.button}
                fullWidth={false} />
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
  signup: (user) => dispatch(auth.signUpRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
