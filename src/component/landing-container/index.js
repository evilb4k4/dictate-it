import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util';
import * as querystring from 'querystring';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {Redirect, Link} from 'react-router-dom';
// import {teal500} from 'material-ui/styles/colors';
import {Card, CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as auth from '../../action/auth-actions.js';
import DictationContainer from '../dictation-container';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export class LandingContainer extends React.Component {
  render(){
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
        color: '#29B6F6',
      },
    };
    return (
      <Card style={style.card} id="login-card">
        <div className='landing-container'>
          {util.renderIf(!this.props.token,
            <Redirect to='/' />
          )}
          {util.renderIf(this.props.token,
            <div className='dictation'>
              <DictationContainer />
              <RaisedButton
                label="Create a new dictation "

                labelPosition="before"
                primary={true}
                fullWidth={false}
                style={{color: '#29B6F6'}}
              />
              <br />
              <div className='logout-submit'>
                <RaisedButton type='submit'
                  label="Logout"
                  fullWidth={false}
                  style={style.button}
                  onClick={this.props.logout}
                />
                <br />
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
