export default (state = null, {type, payload}) => {
  switch(type) {
  case 'SIGNIN':
    return payload;
  case 'SIGNOUT':
    return null;
  default:
    return state;
  }
};
