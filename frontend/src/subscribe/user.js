
import * as auth from '../action/auth.js';

const USER_CONNECTED = (store) => (socket) => (payload) => {
  store.dispatch(auth.userConnected(payload));
};

const USER_DISCONNECTED = (store) => (socket) => (payload) => {
  store.dispatch(auth.userDisconnected(payload));
};

export default {USER_CONNECTED, USER_DISCONNECTED};
