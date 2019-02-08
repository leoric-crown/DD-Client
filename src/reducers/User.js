import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/authedUser'

const defaultState = {
  authenticated: false,
}

export default function User(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
    console.log('SET_AUTHED_USER', action)
      return {
        authenticated: true,
        email: action.authedUser,
        photoURL: action.photoURL,
        isDM: action.isDM,
        userId: action.userId
      }
    case LOGOUT_USER:
      return {
        authenticated: false,
        message: action.message
      }
    default:
      return state
  }

}
