import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {dictationFetchAllRequest, dictationDeleteRequest} from '../../action/dictation-actions.js';
import * as util from '../../lib/util';
import superagent from 'superagent';


export class DictationContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ownerId: '',
    };
    this.handleDeleteDictation = this.handleDeleteDictation.bind(this);
    this.getUserFromToken = this.getUserFromToken.bind(this);
  }

  getUserFromToken(token) {
    return superagent.get(`${__API_URL__}/user`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        this.setState({ ownerId: res.body._id });
        return res;
      });
  }

  componentWillMount() {
    util.log(this.props);
    this.props.getAllDictations()
    this.getUserFromToken(this.props.token)
      .catch(err => util.logError(err));
  }

  handleDeleteDictation(event) {
    event.preventDefault();
    this.props.dictationDelete(event.target.id)
      // .then(() => this.props.getAllDictations())
      // .catch(err => util.logError(err));
    this.props.getAllDictations();
  }

  render() {
    util.log('asdasdas', this.props.dictations)
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
            {this.props.dictations.filter(dictation => dictation.ownerId === this.state.ownerId).map((dictation, i) =>
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
            {this.props.dictations.map((dictation, i) => {
              return <tr key={i}>
                <td>
                  <Link to={`/dictation/${dictation._id}`}>{dictation.title}</Link>
                </td>
                <td>
                  {dictation.description}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  token: state.token,
  dictations: state.dictations ? state.dictations  || []: [],
});

export const mapDispatchToProps = (dispatch) => ({
  getAllDictations: () => dispatch(dictationFetchAllRequest()),
  dictationDelete: id => dispatch(dictationDeleteRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DictationContainer);
