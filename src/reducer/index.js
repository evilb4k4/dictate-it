import {combineReducers} from 'redux';

import token from './auth.js';
import dictations from './dictation.js';


export default combineReducers({token, dictations});
