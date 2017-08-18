export default (state=[], {type, payload}) => {
  switch(type){
  case 'EDIT':
    return [...state, payload];
  default:
    return state;
  }
};
