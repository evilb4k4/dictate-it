export default (state = {}, {type, payload}) => {
  let id, statements;
  switch(type) {
  case 'STATEMENT_CREATE':
    id = payload.id;
    return {...state, ...payload };
  case 'STATEMENT_UPDATE':
    id = payload.id;
    statements = state[id];
    return {...state,
      [id] : statements.map(statement => statement.id === payload.id ? payload : statement)};
  default:
    return state;
  }
};
