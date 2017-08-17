import authReducer from '../reducer/auth.js';

describe('testing auth reducer', () => {
  it('testing TOKEN_SET should return a token', () =>{
    let token = authReducer(null, {type:null});
    expect(token).toEqual(null);
  });
  test('testing LOGIN should return with token', () => {
    let actionOne = {
      type: 'LOGIN',
      payload: {
        username: 'Chicken-little',
        password: '1234',
      },
    };
    let state = authReducer(null, actionOne);
    expect(state).toBe(actionOne.payload);
    expect(state.username).toEqual(actionOne.payload.username);

  });
  test('testing LOGOUT should return with token', () => {
    let actionOne = {
      type: 'LOGOUT',
      payload: null,
    };
    let state = authReducer(null, actionOne);
    expect(null).toBe(actionOne.payload);

  });
});
