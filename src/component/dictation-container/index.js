import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {dictationFetchRequest} from '../../action/dictation-actions.js';
import * as util from '../../lib/util';

export class DictationContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getDictations()
      .catch(err => util.logError(err));
  }

  render() {
    return (
      <table className="dictation-container">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <tbody>
          {this.props.dictations.map((dictation, i) =>
            <tr key={i}>
              <td>{dictation.title}</td>
              <td>{dictation.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  dictations: state.dictations
});

export const mapDispatchToProps = (dispatch) => ({
  getDictations: () => dispatch(dictationFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DictationContainer);
