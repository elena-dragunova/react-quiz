import {FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS} from '../actions/actionTypes';

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
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


    default:
      return state;
  }
}
