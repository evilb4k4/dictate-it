import User from '../model/user.js';

const LOGIN = (socket) => (payload) => {
  User.fromToken(payload)
    .then(user => {
      socket.username = user.username;

      let result = {
        username: socket.username,
        content: `is logged in`,
        meta: true,
      };

      socket.broadcast.emit('USER_CONNECTED', result);
    });
};

const LOGOUT = (socket) => (payload) => {
  let result = {
    username: socket.username,
    content: `is logged out`,
    meta: true,
  };
  socket.broadcast.emit('USER_DISCONNECTED', result);
  delete socket.username;
};

export default {LOGIN, LOGOUT};
