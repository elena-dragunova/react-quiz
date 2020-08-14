import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createReaducer from './create';
import authReducer from './auth';

export default combineReducers({
  quiz: quizReducer,
  create: createReaducer,
  auth: authReducer,
});