import { CLEAR_ERRORS, CHECK_AUTH_STATUS } from "../actions/errors";

const defaultState = {
  authErrorMessage: null,
  authSuccess: false
};

export default function Errors(state = defaultState, action) {
  switch (action.type) {
    case CHECK_AUTH_STATUS:
      return {
        authErrorMessage: action.message,
        authSuccess: action.authSuccess
      };
    case CLEAR_ERRORS:
      return defaultState;
    default:
      return state;
  }
}
