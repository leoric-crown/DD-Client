import * as API from './api'
import { setAuthedUser, logoutUser } from '../actions/authedUser'
import { handleInitialData } from '../actions/shared'

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    API.verifyToken(localStorage.getItem('DNDTOKEN'))
     .then((res) =>  {
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

export const checkToken = (token, dispatch, history) => {
  verifyToken(token)
      .then((authedUser) => {
        if (authedUser) {
          dispatch(setAuthedUser(authedUser.email, "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png", authedUser.isDM, authedUser._id))
          dispatch(handleInitialData(authedUser._id, token))
          history.push({
            pathname: '/dashboard/characters'
          })
        } else {
          localStorage.removeItem('DNDTOKEN')
          dispatch(logoutUser('Session expired'))
          history.push({
            pathname: '/'
          })
        }
      })
}
