import uuid from 'uuid/v1';

export const statementCreate = (statement) => ({
  type: 'STATEMENT_CREATE',
  payload: { ...statement, id: uuid(), timestamp: new Date()},
});
export const statementUpdate = (statement) => ({
  type: 'STATEMENT_UPDATE',
  payload: {...statement},
});
export const statementDelete= (statement) => ({
  type: 'STATEMENT_DELETE',
  payload: { ...statement},
});
