import authReducer from './Auth';
import {combineReducers} from 'redux';

export default combineReducers({
  auth: authReducer,
});