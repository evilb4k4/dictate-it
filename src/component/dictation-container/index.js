import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {dictationFetchAllRequest} from '../../action/dictation-actions.js';
import * as util from '../../lib/util';

export class DictationContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getAllDictations()
      .catch(err => util.logError(err));
  }

  render() {
    return (
      <table className="dictation-container">
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <thead>
          <tr>
            <th colSpan={2}>All Public Dictations</th>
          </tr>
        </thead>
        <tbody>
          {this.props.dictations.map((dictation, i) =>
            <tr key={i}>
              <td>
                <Link to={`/dictation/${dictation._id}`}>{dictation.title}</Link>
              </td>
              <td>
                {dictation.description}
              </td>
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
  getAllDictations: () => dispatch(dictationFetchAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DictationContainer);
