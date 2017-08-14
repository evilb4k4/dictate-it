'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');

const authRouter = module.exports = new Router();

const basicAuth = require('../middleware/basic-auth.js');
const bearerAuth = require('../middleware/bearer-auth.js');

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {
  console.log('body', req.body);
  if(!req.body.password || !req.body.username) {
    return next(new Error('required arguments'));
  }

  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/auth/login', (req, res, next) => {
  console.log('api/auth/login');
  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});

authRouter.delete('api/auth/delete', (req, res, next) => {
  console.log('Hit DELETE', req.user);
  User.findOneAndRemove({_id: req.user._id})
    .then(user => {
      res.send(user._id);
    })
    .catch(next);
});
