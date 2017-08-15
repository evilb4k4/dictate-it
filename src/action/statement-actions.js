import uuid from 'uuid/v1';
import superagent from 'superagent';

export const statementCreate = (statement) => ({
  type: 'STATEMENT_CREATE',
  payload: { ...statement, id: uuid(), timestamp: new Date()},
});

export const statementUpdate = (statement) => ({
  type: 'STATEMENT_UPDATE',
  payload: {...statement},
});

export const statementDelete = (statement) => ({
  type: 'STATEMENT_DELETE',
  payload: { ...statement},
});

export const statementFetch = (statement) => ({
  type: 'STATEMENT_FETCH',
  payload: {...statement},
})

export const statementCreateRequest = (statement) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/statements`)
    .set('Authorization', `Bearer ${auth}`)
    .field()
}
