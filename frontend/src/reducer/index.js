import {combineReducers} from 'redux';

import token from './auth.js';
import route from './route.js';
import statement from './statement.js';
import dictation from './dictation.js';


export default combineReducers({token, route, statement, dictation});
