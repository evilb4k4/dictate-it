import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import superagent from 'superagent';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-actions.js';
import * as route from '../../action/route-actions.js';
import {Redirect} from 'react-router-dom';
import validator from 'validator';

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
    // this.validateChange = this.validateChange.bind(this);
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
    return(
      <div className='signup-container'>
        {util.renderIf(this.props.token,
          <Redirect to='/landing' />
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            required
            name='email'
            type='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />

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

          <button type='submit'> Signup </button>
        </form>
      </div>
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
