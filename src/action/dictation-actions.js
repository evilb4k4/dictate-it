import uuid from 'uuid/v1';
import superagent from 'superagent';
import * as util from '../lib/util';

export const dictationCreate = (dictation) => {
  dictation.id = uuid();
  dictation.timestamp = new Date();
  return {
    type: 'DICTATION_CREATE',
    payload: dictation,
  };
};

export const dictationStart = (dictation) => ({
  type: 'DICTATION_START',
  payload: dictation,
});

export const dictationStop = (dictation) => ({
  type: 'DICTATION_STOP',
  payload: dictation,
});

export const dictationUpdate = (dictation) => ({
  type: 'DICTATION_UPDATE',
  payload: dictation,
});

export const dictationDelete = (dictation) => ({
  type: 'DICTATION_DELETE',
  payload: dictation,
});

export const dictationFetch = (dictations) => ({
  type: 'DICTATION_FETCH',
  payload: dictations,
});

export const dictationMine = (dictations) => ({
  type: 'DICTATION_MINE',
  payload: dictations,
});

export const dictationReset = () => ({type: 'DICTATION_RESET'});

export const dictationCreateRequest = (dictation) => (dispatch, getState) => {
  let {token} = getState();
  return superagent.post(`${__API_URL__}/dictations/create`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      description: dictation.description,
      title: dictation.title,
      body: dictation.body,
    })
    .then(res => {
      dispatch(dictationCreate(res.body));
      return res;
    });
};

export const dictationUpdateRequest = (dictation) => (dispatch, getState) => {
  let {token} = getState();
  return superagent.put(`${__API_URL__}/dictations/${dictation._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      description: dictation.description,
      title: dictation.title,
      body: dictation.body,
    })
    .then(res => {
      dispatch(dictationUpdate(res.body));
      return res;
    });
};

export const dictationFetchAllRequest = () => (dispatch, getState) => {
  let {token} = getState();

  return superagent.get(`${__API_URL__}/dictations`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(dictationFetch(res.body));
      return res;
    });
};

export const dictationMineRequest = () => (dispatch, getState) => {
  let {token} = getState();
  return superagent.get(`${__API_URL__}/dictations/me`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(dictationMine(res.body));
      return res;
    });
};

export const dictationDeleteRequest = (id) => (dispatch, getState) => {
  let {token} = getState();
  return superagent.delete(`${__API_URL__}/dictations/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      dispatch(dictationDelete(res.body));
    });
};
