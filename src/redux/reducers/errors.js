import { CLEAR_ERRORS, CHECK_AUTH_STATUS, CHECK_SIGNUP_STATUS } from "../actions/errors";

const defaultState = {
  authErrorMessage: null,
  authSuccess: false,
  signUpSuccess: false,
  signUpErrorMessage: null
};

export default function Errors(state = defaultState, action) {
  switch (action.type) {
    case CHECK_AUTH_STATUS:
      return {
        authSuccess: action.authSuccess,
        authErrorMessage: action.message,
      };
    case CLEAR_ERRORS:
      return defaultState;
    case CHECK_SIGNUP_STATUS:
      return {
        ...state,
        signUpSuccess:action.signUpSuccess,
        signUpErrorMessage: action.message
      }
    default:
      return state;
  }
}
