import {
  CLEAR_ERRORS,
  CHECK_AUTH_STATUS,
  CHECK_SIGNUP_STATUS,
  CHECK_PASSWORD_RESTORE_STATUS,
  SET_PASSWORD_FORGET_SUCCESS,
  SET_PASSWORD_FORGET_FAILURE,
  SET_VERIFY_EMAIL_STATUS,
  SET_DELETE_WARNING
} from '../actions/errors'

const defaultState = {
  authErrorMessage: null,
  authSuccess: false,
  signUpSuccess: false,
  signUpErrorMessage: null,
  passwordRestoreSuccess: false,
  passwordRestoreSuccessMessage: '',
  forgotPasswordSuccessMessage: '',
  forgotPasswordFailMessage: '',
  verifyEmail: false,
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
    case SET_VERIFY_EMAIL_STATUS:
      return {
        ...state,
        verifyEmail: {
          success: action.success,
          message: action.message
        }
      }
    case SET_DELETE_WARNING:
      return {
        ...state,
        deleteWarning: {
          success: action.success,
          message: action.message
        }
      }
    default:
      return state
  }
}
