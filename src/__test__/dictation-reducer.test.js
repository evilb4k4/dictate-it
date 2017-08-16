import dictationReducer from '../reducer/dictation.js';
import * as util from '../lib/util.js';

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
  test('DICTATION_CREATE should append to the array', () => {
    let actionOne = {
      type: 'DICTATION_CREATE',
      payload: {
        id:'123',
        title: 'cool beans',
        timestamp: new Date(),
      },
    };

    let state = dictationReducer([], actionOne);
    expect(state.length).toBe(1);
    expect(state[0]).toBe(actionOne.payload);

    let actionTwo = {
      type: 'DICTATION_CREATE',
      payload: {
        id:'goo',
        title: 'lulwat',
        timestamp: new Date(),
      },
    };

    state = dictationReducer(state, actionTwo);
    expect(state.length).toBe(2);
    expect(state[0]).toBe(actionOne.payload);
    expect(state[1]).toBe(actionTwo.payload);
  });
  test('DICTATION_DELETE should delete a dictation from the array', () => {
    let mockState = [
      { id: 'abc',  title: 'cool', timestamp: new Date()},
      { id: '123',  title: 'numbers', timestamp: new Date()},
      { id: 'zyx',  title: 'lulwat', timestamp: new Date()},
      { id: '000',  title: 'zero', timestamp: new Date()},
    ];

    let actionOne= {
      type: 'DICTATION_DELETE',
      payload: mockState[1],
    };

    let state = dictationReducer(mockState, actionOne);

    expect(state.length).toBe(3);
    expect(state).toEqual(mockState.filter(item => item.id != '123'));
  });
  test('DICTATION_UPDATE should update a dictation in the array', () => {
    let mockState = [
      { id: 'abc',  title: 'cool', timestamp: new Date()},
      { id: '123',  title: 'numbers', timestamp: new Date()},
      { id: 'zyx',  title: 'lulwat', timestamp: new Date()},
      { id: '000',  title: 'zero', timestamp: new Date()},
    ];

    let actionOne= {
      type: 'DICTATION_UPDATE',
      payload: {id: 'zyx', title: 'sub', timestamp: new Date()},
    };

    let state = dictationReducer(mockState, actionOne);

    expect(state.length).toBe(4);
    expect(state).toEqual(mockState.map(item =>
      item.id == 'zyx' ? actionOne.payload : item));
  });
});
