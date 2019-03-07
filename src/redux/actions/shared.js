import * as API from '../../utils/api'
import { receiveCharacters } from './characters'
import { receiveEncounters } from './encounters'
import { receiveInitiatives } from './initiatives'
import { receiveConditions } from './conditions'
import { setAuthedUser } from './authedUser'
import {
  setAuthStatus,
  setSignUpStatus,
  setPasswordRestoreStatus,
  setForgotPasswordSuccess,
  setForgotPasswordFailure,
  setVerifyEmailStatus
} from './errors'

export function handleSignUp(payload, defaultUserPic) {
  return dispatch => {
    return API.signup(payload)
      .then(res => {
        // We set errors to empty object to clear previous errors
        if (res.status.code === 200) {
          // const { jwt, status, ...authedUser } = res
          // localStorage.setItem('DNDTOKEN', res.jwt)
          // dispatch(setAuthedUser(authedUser))
          // dispatch(setSignUpStatus(null, true))
          // dispatch(handleInitialData(authedUser, res.jwt))
          dispatch(setSignUpStatus(res.status.message, true))
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
      })
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
      dispatch(receiveConditions(data.conditions, authedUserData))
    })
  }
}

export function handlePasswordRestore(password, token) {
  return dispatch => {
    return API.restorePassword(password, token).then(res => {
      if (res.status.code === 200) {
        dispatch(
          setPasswordRestoreStatus(
            'Password changed! You may now login using you new password',
            true
          )
        )
      } else {
        dispatch(
          setPasswordRestoreStatus(
            'Token expired. Please use Forgot Password again',
            false
          )
        )
      }
    })
  }
}

export function handleForgotMyPassword(email, callback) {
  return dispatch => {
    return API.forgotPassword(email, callback).then(res => {
      if (res.status['code'] === 200) {
        dispatch(setForgotPasswordSuccess(res.status['message']))
      } else {
        dispatch(setForgotPasswordFailure(res.status['message']))
      }
    })
  }
}

export function handleVerifyEmail(token, callback) {
  return dispatch => {
    return API.verifyEmail(token).then(res => {
      dispatch(setVerifyEmailStatus(res.status.code, res.status.message))
    })
  }
}
