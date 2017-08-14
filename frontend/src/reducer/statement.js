export default (state = [], {type, payload}) => {
  let doc_id, statements;
  switch(type) {
  case 'STATEMENT_CREATE':
    doc_id = payload.doc_id;
    statements = state[doc_id];
    return {...state, [doc_id]: [...statements, payload] };
  case 'STATEMENT_UPDATE':
    doc_id = payload.doc_id;
    statements = state[doc_id];
    return {...state,
      [doc_id] : statements.map(statement => statement.id === payload.id ? payload : statement)};
  default:
    return state;
  }
};
