import dictationReducer from '../reducer/dictation.js';

describe('testing dictation reducer', () => {
  test('inital state should be an empty array', () =>{
    let result = dictationReducer(undefined, {type: null});
    expect(result).toEqual([]);
  });
  test('if the action type isnt registerd it will return the state', () =>{
    let mockState = [
      { id: 'abc',  title: 'cool'},
      { id: '123',  title: 'cool'},
    ];

    let result = dictationReducer(mockState, {type: null});
    util.log(result);
    expect(result).toEqual(mockState);
  });
});
