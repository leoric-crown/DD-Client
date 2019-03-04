import * as API from '../../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters'
import { receiveInitiatives } from './initiatives'
import { setAuthedUser } from './authedUser'
import { setAuthStatus, setSignUpStatus } from './errors'

export function handleSignUp(payload, defaultUserPic) {
  return dispatch => {
    return API.signup(payload)
      .then(res => {
        // We set errors to empty object to clear previous errors
        if (res.status.code === 200) {
          const { jwt, status, ...authedUser } = res
          localStorage.setItem('DNDTOKEN', res.jwt)
          dispatch(setAuthedUser(authedUser))
          dispatch(setSignUpStatus(null, true))
          dispatch(handleInitialData(authedUser, res.jwt))
        } else {
          dispatch(setSignUpStatus(res.status.message, false))
        }
      })
      .catch(e => {
        alert('Whoops something went wrong... \n\nPlease try again later')
      })
  }
}

export function handleFBLogin(accessToken) {
  return dispatch => {
    return API.fbLogin(accessToken)
      .then(res => {
        if (res.status.code === 200) {
          const { __v, jwt, status, id, ...authedUser } = res
          localStorage.setItem('DNDTOKEN', res.jwt)
          dispatch(setAuthStatus(null, true))
          dispatch(setAuthedUser(authedUser))
          dispatch(handleInitialData(res, res.jwt))
        } else {
          dispatch(setAuthStatus(res.status.message, false))
        }
      })
      .catch(err => {
          alert('Oops something went wrong...\nPlease try again later')
        }
      )
  }
}

export function handleLogin({ email, password }) {
  return dispatch => {
    return API.login({ email, password })
      .then(res => {
        if (res.status.code === 200) {
          const { jwt, status, ...authedUser } = res
          localStorage.setItem('DNDTOKEN', res.jwt)
          dispatch(setAuthStatus(null, true))
          dispatch(setAuthedUser(authedUser))
          dispatch(handleInitialData(res, res.jwt))
        } else {
          // Authentication failed
          dispatch(setAuthStatus(res.status.message, false))
        }
      })
      .catch(() =>
        alert('Oops something went wrong...\nPlease try again later')
      )
  }
}

export function handleInitialData(user, jwt) {
  return dispatch => {
    return API.getInitialData(user, jwt).then(data => {
      const authedUserData = {
        email: user.email,
        isDM: user.isDM,
        userId: user.userId
      }
      dispatch(receiveCharacters(data.characters, authedUserData))
      dispatch(receiveEncounters(data.encounters, authedUserData))
      dispatch(receiveInitiatives(data.initiatives, authedUserData))
    })
  }
}
