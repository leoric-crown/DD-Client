import * as API from './api'
import { setAuthedUser, logoutUser } from '../redux/actions/authedUser'
import { handleInitialData } from '../redux/actions/shared'

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

export function checkToken(token, pathname) {
  verifyToken(token)
    .then((authedUser) => {
      if (authedUser) {
        this.props.dispatch(setAuthedUser(authedUser))
        this.props.dispatch(handleInitialData(authedUser, token))
        this.props.history.push({
          pathname: pathname ? pathname : '/characters'
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
