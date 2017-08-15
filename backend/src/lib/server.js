'use strict';

import cors from 'cors';
import io from './io.js';
import morgan from 'morgan';
import {Server} from 'http';
import express from 'express';
import * as mongo from './mongo.js';

import authRouter from '../routes/auth-router.js';
import dictationRouter from '../routes/dictation-router.js';

import errorHandler from '../middleware/error-middleware.js';

import authSubscriber from '../subscribe/auth.js';

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGINS.split(' '),
  credentials: true,
}));

app.use(authRouter);
app.use(dictationRouter);


app.use(errorHandler);

const state = {
  isOn: false,
  http: null,
};

export const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn)
      return reject(new Error('USAGE ERROR: the state is on'));
    state.isOn = true;
    mongo.start()
      .then(() => {
        state.http = Server(app);
        let subscribers = Object.assign(authSubscriber);
        io(state.http, subscribers);

        state.http.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT);
          resolve();
        });
      })
      .catch(reject);
  });
};

export const stop = () => {
  return new Promise((resolve, reject) => {
    if(!state.isOn)
      return reject(new Error('USAGE ERROR: the state is off'));
    return mongo.stop()
      .then(() => {
        state.http.close(() => {
          console.log('__SERVER_DOWN__');
          state.isOn = false;
          state.http = null;
          resolve();
        });
      })
      .catch(reject);
  });
};
