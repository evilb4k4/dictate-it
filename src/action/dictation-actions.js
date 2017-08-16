import uuid from 'uuid/v1';
import superagent from 'superagent';

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

export const dictationFetch = (dictation) => ({
  type: 'DICTATION_FETCH',
  payload: dictation,
});

export const dictationReset = () => ({type: 'DICTATION_RESET'});

export const dictationCreateRequest = (dictation) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.post(`${__API_URL__}/dictations`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', dictation.description)
    .field('title', dictation.title)
    .field('public', dictation.public)
    .then(res => {
      dispatch(dictationCreate(res.body));
      return res;
    });
};

export const dictationUpdateRequest = (dictation) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.put(`${__API_URL__}/dictations/${dictation._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .field('description', dictation.description)
    .field('title', dictation.title)
    .field('public', dictation.public)
    .then(res => {
      dispatch(dictationUpdate(res.body));
      return res;
    });
};

export const dictationFetchRequest = () => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.get(`${__API_URL__}/dictations/me`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(dictationFetch(res.body.data));
      return res;
    });
};

export const dictationDeleteRequest = (dictation) => (dispatch, getState) => {
  let {auth} = getState();
  return superagent.delete(`${__API_URL__}/dictations/${dictation._id}`)
    .set('Authorization', `Bearer ${auth}`)
    .then(res => {
      dispatch(dictationDelete(dictation));
    });
};
