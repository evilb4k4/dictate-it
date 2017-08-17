import {combineReducers} from 'redux';

import token from './auth.js';
import dictation from './dictation.js';


export default combineReducers({token, dictation});
