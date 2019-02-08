import * as API from './api'
import { setAuthedUser, logoutUser } from '../actions/authedUser'
import { handleInitialData } from '../actions/shared'

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    API.verifyToken(localStorage.getItem('DNDTOKEN'))
      .then((res) => {
        if (res.status) {
          resolve(res.user)
        } else {
          reject()
        }
      }).catch((err) => {
        resolve(false)
      })
  })
}

export function checkToken(token) {
  verifyToken(token)
    .then((authedUser) => {
      if (authedUser) {
        this.props.dispatch(setAuthedUser(authedUser.email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", authedUser.isDM, authedUser._id))
        this.props.dispatch(handleInitialData(authedUser._id, token))
        this.props.history.push({
          pathname: '/dashboard/characters'
        })
      } else {
        localStorage.removeItem('DNDTOKEN')
        this.props.dispatch(logoutUser('Session expired'))
        this.props.history.push({
          pathname: '/'
        })
      }
    })
}
