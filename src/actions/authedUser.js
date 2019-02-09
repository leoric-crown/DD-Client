export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

const defaultUserPic = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"

export function setAuthedUser(user) {
  var { email, photoURL, isDM, userId } = user
  if(!photoURL) photoURL = defaultUserPic
  return {
    type: SET_AUTHED_USER,
    authedUser: email,
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
