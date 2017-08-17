import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {dictationFetchAllRequest, dictationMineRequest, dictationDeleteRequest} from '../../action/dictation-actions.js';
import * as util from '../../lib/util';

export class DictationContainer extends React.Component {
  constructor(props){
    super(props);

    this.handleDeleteDictation = this.handleDeleteDictation.bind(this);
  }

  componentWillMount() {
    this.props.getAllDictations()
      .catch(err => util.logError(err));
    this.props.getMyDictations()
      .catch(err => util.logError(err));
  }

  handleDeleteDictation(event) {
    event.preventDefault();
    this.props.dictationDelete(event.target.id)
      .then(() => this.props.getAllDictations())
      .catch(err => util.logError(err));
  }

  render() {
    return (
      <div>
        {util.renderIf(!this.props.token,
          <Redirect to='/' />
        )}
        <table className="my-dictations-container">
          <thead>
            <tr>
              <th colSpan={3}>My Dictations</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dictations.map((dictation, i) =>
              dictation._id ? <tr key={i}>
                <td>
                  <button onClick={this.handleDeleteDictation} id={dictation._id}>X</button>
                </td>
                <td>
                  <Link to={`/dictation/${dictation._id}`}>{dictation.title}</Link>
                </td>
                <td>
                  {dictation.description}
                </td>
              </tr>
              : undefined
            )}
          </tbody>
        </table>
        <table className="all-dictations-container">
          <thead>
            <tr>
              <th colSpan={2}>Public Dictations</th>
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
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  dictations: state.dictations,
  myDictations: state.myDictations,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllDictations: () => dispatch(dictationFetchAllRequest()),
  getMyDictations: () => dispatch(dictationMineRequest()),
  dictationDelete: id => dispatch(dictationDeleteRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DictationContainer);
