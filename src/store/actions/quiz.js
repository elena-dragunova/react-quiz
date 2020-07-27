import axios from '../../axios/axios-quiz'
import {FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS} from './actionTypes';

export function fetchQuizzes() {
  return async dispatch => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get('/quizzes.json');

      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Test №${index + 1}`,
        })
      });
      dispatch(fetchQuizzesSuccess(quizzes))
    } catch (err) {
      dispatch(fetchQuizzesError(err))
    }
  }
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START,
  }
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes,
  }
}

export function fetchQuizzesError(err) {
  return {
    type: FETCH_QUIZZES_ERROR,
    err,
  }
}