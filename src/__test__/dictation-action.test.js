import {
  dictationCreate,
  dictationUpdate,
  dictationDelete,
} from '../action/dictation.js';

describe('testing dictation actions', () => {
  test('dictationCreate returns a DICTATION_CREATE action', () => {
    let action = dictationCreate({title: 'cool'});
    expect(action.type).toEqual('DICTATION_CREATE');
    console.log(action);
    expect(action.payload.id).toBeTruthy();
    expect(action.payload.timestamp).toBeTruthy();
    expect(action.payload.title).toBe('cool');
  });

  test('dictationDelete returns a DICTATION_DELETE action', () => {
    let mockDictation = {id: '124', timestamp: new Date() , title: 'cool'};
    let action = dictationDelete(mockDictation);
    expect(action).toEqual({
      type: 'DICTATION_DELETE',
      payload: mockDictation,
    });
  });

  test('dictationUpdate returns a DICTATION_UPDATE action', () => {
    let mockDictation = {id: '124', timestamp: new Date() , title: 'cool'};
    let action = dictationUpdate(mockDictation);
    expect(action).toEqual({
      type: 'DICTATION_UPDATE',
      payload: mockDictation,
    });
  });
});
