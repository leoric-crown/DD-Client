import * as API from './api'
import { setAuthedUser, logoutUser } from '../redux/actions/authedUser'
import { handleInitialData } from '../redux/actions/shared'

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    API.verifyToken(localStorage.getItem('DNDTOKEN'))
      .then((res) => {

        if (res.status) {
          const { __v, status, ...user } = res
          resolve(user)
        } else {
          reject()
        }
      }).catch((err) => {
        resolve(false)
      })
  })
}

export function checkToken(token, pathname = false) {
  verifyToken(token)
    .then((user) => {
      if (user) {
        this.props.dispatch(setAuthedUser(user))
        this.props.dispatch(handleInitialData(user, token))
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
