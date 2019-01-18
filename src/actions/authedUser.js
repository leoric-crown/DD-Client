export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function setAuthedUser (authedUser, photoURL) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
    photoURL
  }
}

export function logoutUser () {
  return {
    type: LOGOUT_USER
  }
}
