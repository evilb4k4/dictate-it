let initialState = [];
export default (state = initialState, action) => {
  let {type, payload} = action;
  switch(type) {
  case 'DICTATION_CREATE':
    return [...state, payload];
  case 'DICTATION_MINE':
    return [...state, payload];
  case 'DICTATION_START':
    return [...state, payload];
  case 'DICTATION_STOP':
    return [...state, payload];
  case 'DICTATION_FETCH':
    return payload;
  case 'DICTATION_UPDATE':
    return state.map(dictation =>
      dictation.id == payload.id ? payload : dictation);
  case 'DICTATION_DELETE':
    return state.filter(dictation => dictation.id !== payload.id);
  case 'DICTATION_RESET':
    return initialState;
  default:
    return state;
  }
};
