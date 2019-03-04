import { SET_AUTHED_USER, LOGOUT_USER, UPDATE_USER } from '../actions/authedUser'

const defaultState = {
  authenticated: false,
}

export default function User(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        authenticated: true,
        ...action.authedUser
      }
    case LOGOUT_USER:
      return {
        authenticated: false,
        message: action.message
      }
    case UPDATE_USER:
      return {
        ...action.userData,
        authenticated: true
      }
    default:
      return { ...state }
  }

}
