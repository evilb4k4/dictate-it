import {Router} from 'express';
import bodyParser from 'body-parser';
import User from '../model/user.js';
import basicAuth from '../middleware/basic-auth.js';
import superagent from 'superagent';

export default new Router()
  .get('oauth/google/code', (req, res, next) => {
    console.log('req.query', req.query);
    if(!req.query.code){
      res.redirect(process.env.CLIENT_URL);
    } else {
      superagent.post('https://googleapis.com/oauth2/v4/token')
        .type('form')
        .send({
          code: req.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.API_URL}/oauth/google/code`,
        })
        .then(res => {
          console.log('google token data', res.body);
          return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
            .set('Authorization', `Bearer ${res.body.access_token}`);
        })
        .then(res => {
          console.log('google profile', res.body);
          return User.handleOAUTH(res.body);
        })
        .then(user => user.tokenCreate())
        .then(token => {
          res.cookie('Dictation-Token', token);
          res.redirect(process.env.CLIENT_URL);
        })
        .catch((error) => {
          console.error(error);
          res.redirect(process.env.CLIENT_URL);
        });
    }
  })
  .post('/signup', bodyParser.json(), (req, res, next) => {
    new User.createFromSignup(req.body)
      .then(user => user.tokenCreate())
      .then(token => {
        res.cookie('Dictation-Token', token);
        res.send(token);
      })
      .catch(next);
  })
  .get('/login', basicAuth, (req, res, next) => {
    req.user.tokenCreate()
      .then((token) => {
        res.cookie('Dictation-Token', token);
        res.send(token);
      })
      .catch(next);
  })
  .get('/usernames/:username', (req, res, next) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if(!user)
          return res.sendStatus(200);
        return res.sendStatus(409);
      })
      .catch(next);
  });





// authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {
//   console.log('body', req.body);
//   if(!req.body.password || !req.body.username) {
//     return next(new Error('required arguments'));
//   }
//
//   User.create(req.body)
//     .then(token => res.send(token))
//     .catch(next);
// });
//
// authRouter.get('/api/auth/login', (req, res, next) => {
//   console.log('api/auth/login');
//   req.user.tokenCreate()
//     .then(token => res.send(token))
//     .catch(next);
// });
//
// authRouter.delete('api/auth/delete', (req, res, next) => {
//   console.log('Hit DELETE', req.user);
//   User.findOneAndRemove({_id: req.user._id})
//     .then(user => {
//       res.send(user._id);
//     })
//     .catch(next);
// });
