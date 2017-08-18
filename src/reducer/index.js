import {combineReducers} from 'redux';

import token from './auth.js';
import dictations from './dictation.js';
import edits from './edits.js';

export default combineReducers({edits, token, dictations});
