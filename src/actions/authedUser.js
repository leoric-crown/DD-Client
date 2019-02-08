export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function setAuthedUser(authedUser, photoURL, isDM, userId) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
    photoURL,
    isDM,
    userId
  }
}

export function logoutUser(message) {
  return {
    type: LOGOUT_USER,
    message
  }
}
