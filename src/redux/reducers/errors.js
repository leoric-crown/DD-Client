import {
  CLEAR_ERRORS,
  CHECK_AUTH_STATUS,
  CHECK_SIGNUP_STATUS,
  CHECK_PASSWORD_RESTORE_STATUS,
  SET_PASSWORD_FORGET_SUCCESS,
  SET_PASSWORD_FORGET_FAILURE
} from '../actions/errors'

const defaultState = {
  authErrorMessage: null,
  authSuccess: false,
  signUpSuccess: false,
  signUpErrorMessage: null,
  passwordRestoreSuccess: false,
  passwordRestoreSuccessMessage: '',
  forgotPasswordSuccessMessage: '',
  forgotPasswordFailMessage: ''
}

export default function Errors(state = defaultState, action) {
  switch (action.type) {
    case CHECK_AUTH_STATUS:
      return {
        authSuccess: action.authSuccess,
        authErrorMessage: action.message
      }
    case CLEAR_ERRORS:
      return defaultState
    case CHECK_SIGNUP_STATUS:
      return {
        ...state,
        signUpSuccess: action.signUpSuccess,
        signUpErrorMessage: action.message
      }
    case CHECK_PASSWORD_RESTORE_STATUS:
      return {
        ...state,
        passwordRestoreSuccessMessage: action.message,
        passwordRestoreSuccess: action.status
      }
    case SET_PASSWORD_FORGET_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccessMessage: action.message
      }
      case SET_PASSWORD_FORGET_FAILURE:
      return {
        ...state,
        forgotPasswordFailMessage: action.message
      }
    default:
      return state
  }
}
