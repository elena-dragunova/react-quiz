import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createReaducer from './create';

export default combineReducers({
  quiz: quizReducer,
  create: createReaducer
});