import superagent from 'superagent';
import * as util from '../lib/util.js';

export const signIn = token => ({
  type: 'SIGNIN',
  payload: token,
});

export const signOut = () => {
  util.cookieDelete('Dictation-token');
  return { type: 'SIGNOUT' };
};

export const signInRequest = user => dispatch =>
  superagent.get(`${__API_URL__}/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then(res => {
      let token = util.cookieFetch('Dictation-Token');
      if(token)
        dispatch(signIn(token));
      return res;
    })
    .catch(util.logError);

export const signUpRequest = user => dispatch =>
  superagent.post(`${__API_URL__}/signup`)
    .withCredentials()
    .send(user)
    .then(res => {
      let token = util.cookieFetch('Dictation-Token');
      if(token)
        dispatch(signIn(token));
      return res;
    })
    .catch(util.logError);
