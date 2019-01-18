import { SET_AUTHED_USER, LOGOUT_USER } from '../actions/authedUser'

const defaultState = {
  authenticated:false,
}

export default function User (state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        authenticated:true,
        email: action.authedUser,
        photoURL: action.photoURL
      }
    case LOGOUT_USER:
      return {
        authenticated:false
      }
    default :
      return state
  }

}
