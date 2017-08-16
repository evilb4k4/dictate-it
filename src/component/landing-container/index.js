import React from 'react';
import {connect} from 'react-redux';
import * as route from '../../action/route-actions.js';
import * as querystring from 'querystring';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';

export class LandingContainer extends React.Component {
  render(){
    return (
      <div className='landing-container'>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}

      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
