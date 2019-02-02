import config from '../config.json';

const api = config.API

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const login = (payload) =>
  fetch(`${api}/users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  }).then(res => res.json())
  .catch(e => console.log(e))

export const signup = (payload) =>
  fetch(`${api}/users/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => data)
  .catch(e => console.log(e))

export const fbLogin = (accessToken) =>
  fetch(`${api}/users/auth/facebook`, {
    method:'POST',
    headers: {
      ...headers,
      'Authorization':`Bearer ${accessToken}`
    },
  }).then(res => res.json())

export const createCharacter = (token, payload) => {
  let data = new FormData()
  Object.entries(payload).forEach(keyValue => {
    data.append(keyValue[0],keyValue[1])
  })
  return fetch(`${api}/characters`, {
    method:'POST',
    headers: {
      'Authorization':`Bearer ${token}`
    },
    body: data
  }).then(res => res.json())
}

 export const getInitialData = (userId, token) =>
   fetch(`${api}/characters/${userId}`, {
     method:'GET',
     headers: {
       ...headers,
       'Authorization':`Bearer ${token}`
     },
   })
   .then(res => res.json())
   .then(res => res.characters)

   export const verifyToken = (token) =>
   fetch(`${api}/users/verifyToken`, {
     method:'POST',
     headers: {
       'Authorization':`Bearer ${token}`
     },
   }).then(res => res.json())
