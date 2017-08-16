import superagent from 'superagent';
import * as util from '../lib/util.js';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

const login = token => ({
  type: 'LOGIN',
  payload: token,
});

export const logout = () => {
  util.cookieDelete('Dictation-Token');
  return { type: 'LOGOUT' };
};

export const loginRequest = user => dispatch =>
  superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      util.log('res', res)
      let token = util.cookieCreate('Dictation-Token', res.token, 7);
      if(token)
        dispatch(login(token));
      return res;
    })
    .catch(util.logError);

export const signUpRequest = user => dispatch =>
  superagent.post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      let token = util.cookieCreate('Dictation-Token', res.token, 7);
      if(token)
        dispatch(login(token));
      return res;
    })
    .catch(util.logError);
