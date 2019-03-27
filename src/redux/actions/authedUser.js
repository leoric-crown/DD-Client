import * as API from '../../utils/api'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'

const defaultUserPic = "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"

export function setAuthedUser(authedUser) {
  if (!authedUser.photoURL) authedUser.photoURL = defaultUserPic
  return {
    type: SET_AUTHED_USER,
    authedUser
  }
}

export function logoutUser(message) {
  return {
    type: LOGOUT_USER,
    message
  }
}

export function patchUser(token, payload, url) {
  return (dispatch) => {
    return API.patchByUrl(token, payload, url)
      .then(response => {
        if (!response.photoURL) response.photoURL = defaultUserPic
        const { status, jwt, ...userData } = response
        localStorage.setItem('DNDTOKEN', jwt)
        if(response.status.code === 200) {
          dispatch(updateUser(userData))
        }
      })
  }
}

export function updateUser(userData) {
  return {
    type: UPDATE_USER,
    userData
  }
}
