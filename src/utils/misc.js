import * as API from './api'

export const verifyToken = (token) => {
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
