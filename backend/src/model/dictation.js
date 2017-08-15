'use strict';

const mongoose = require('mongoose');

const dictationSchema = mongoose.Schema({
  owner: {type: String, required: true, minlength: 1, maxlength: 256},
  title: {type: String, required: true, minlength: 1, maxlength: 256},
  public: {type: Boolean, required: true, default: true},
  timestamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model('dictation', dictationSchema);
