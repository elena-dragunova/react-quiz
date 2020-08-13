import {
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
} from '../actions/actionTypes';

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: action.quizzes,
        loading: false,
      };
    case FETCH_QUIZZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.err,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
      };
    case FETCH_QUIZ_ERROR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case RETRY_QUIZ:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      };
    default:
      return state;
  }
}
