import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
} from './actionTypes';

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

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizzesStart());

    try {
      const response = await axios.get(`/quizzes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizError(e));
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  }
}

export function fetchQuizError(err) {
  return {
    type: FETCH_QUIZ_ERROR,
    err,
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const keys = Object.keys(state.answerState);
      const key = keys[0];
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizSetState({[answerId]: 'success',}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error',}, results))
    }
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}