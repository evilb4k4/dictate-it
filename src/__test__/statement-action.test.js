import {
  statementCreate,
  statementUpdate,
  statementDelete,
} from '../action/statement-actions.js';

describe('testing statement actions', () => {
  test('statementCreate returns a STATEMENT_CREATE action', () => {
    let action = statementCreate({title: 'lulwat'});
    expect(action.type).toEqual('STATEMENT_CREATE');
    console.log(action);
    expect(action.payload.id).toBeTruthy();
    expect(action.payload.timestamp).toBeTruthy();
    expect(action.payload.title).toBe('lulwat');
  });
  test('statementUpdate returns a STATEMENT_UPDATE action', () => {
    let mockStatement = {id: '123', timestamp: new Date() , title: 'lulwat'};
    let action = statementUpdate(mockStatement);
    console.log(action);
    expect(action).toEqual({
      type: 'STATEMENT_UPDATE',
      payload: mockStatement,
    });
  });
  test('statementDelete returns a STATEMENT_DELETE action', () => {
    let mockStatement = {id: '124', timestamp: new Date() , title: 'cool'};
    let action = statementDelete(mockStatement);
    console.log(statementDelete());
    expect(action).toEqual({
      type: 'STATEMENT_DELETE',
      payload: mockStatement,
    });
  });
});
