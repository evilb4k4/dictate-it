import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as auth from '../../action/auth-actions.js';
import {Redirect} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



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
    const style = {

    };
    return(
      <div className='login-container'>
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
            <div className='login-submit'>
              <RaisedButton type='submit' label="Submit" fullWidth={true} />
            </div>
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
