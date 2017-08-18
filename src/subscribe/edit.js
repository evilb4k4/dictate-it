import * as edit from '../action/edit-actions.js';

const EDIT = (store) => (socket) => (payload) => {
  store.dispatch(edit.edit(payload));
};

export default {EDIT};
