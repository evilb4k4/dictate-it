import React from 'react';
import {connect} from 'react-redux';
import Listener from '../listener';
import * as util from '../../lib/util';
import {Redirect} from 'react-router-dom';

export class Dictation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  render() {
    return (
      <div className="live-dictation">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <Listener />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dictation);
