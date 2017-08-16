export default (state = null, {type, payload}) => {
  switch(type) {
  case 'TOKEN_SET':
    return payload;
  case 'LOGIN':
    return payload;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};
