import {Router} from 'express';
import Dictation from '../model/dictation.js';
import bearerAuth from '../middleware/bearer-auth.js';
import bodyParser from 'body-parser';

export default new Router()
  .post('/create', bearerAuth, bodyParser.json(), (req, res, next) => {
    req.body.owner_id = req.user._id;
    new Dictation(req.body)
      .save()
      .then(dictation => res.json(dictation))
      .catch(next);
  })

  .get('/dictations/:id', bearerAuth, (req, res, next) => {
    Dictation.findById(req.params.id)
      .then(dictation => res.json(dictation))
      .catch(next);
  })

  .get('/dictations', bearerAuth, (req, res, next) => {
    let pageNumber = Number(req.query.page);
    if(!pageNumber || pageNumber < 1) pageNumber = 1;
    pageNumber--;

    Dictation.find({})
      .sort({title: 'asc'})
      .skip(pageNumber * 50)
      .limit(50)
      .then(dictations => res.json(dictations))
      .catch(next);
  })

  .put('/dictations/:id', bearerAuth, bodyParser.json(), (req, res, next) => {

    Dictation.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(dictation => res.json(dictation))
      .catch(next);
  })

  .delete('/dictations/:id', bearerAuth, (req, res, next) => {

    Dictation.findByIdAndRemove(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
