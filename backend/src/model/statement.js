'use strict';

const mongoose = require('mongoose');
const Dictation = require('./dictation.js');

const statementSchema = mongoose.Schema({
  owner: {type: String, required: true, minlength: 1, maxlength: 256},
  timestamp: {type: Date, default: Date.now},
  content: {type: String, required: true, minlength: 1},
  dictationId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'dictation'},
});

statementSchema.pre('save', function(next) {
  console.log('pre save statement', this);
  Dictation.findById(this.dictationId)
    .then(dictation => {
      if(!dictation)
        throw 'nonexistent dictation';
    })
    .then(() => next())
    .catch(() =>
      next(new Error('validation failed to create statement because dictation does not exist')));
});

module.exports = mongoose.model('statement', statementSchema);
