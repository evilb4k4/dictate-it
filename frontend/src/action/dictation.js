import uuid from 'uuid/v1';

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

export const dictationReset = () => ({type: 'DICTATION_RESET'});
