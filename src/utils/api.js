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
    method: 'POST',
    headers: {
      ...headers,
      'Authorization': `Bearer ${accessToken}`
    },
  }).then(res => res.json())

export const createCharacter = (token, payload) => {
  let data = new FormData()
  Object.entries(payload).forEach(keyValue => {
    data.append(keyValue[0], keyValue[1])
  })
  return fetch(`${api}/characters`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: data
  }).then(res => res.json())
}

export const createEncounter = (token, payload) => {
  return fetch(`${api}/encounters`, {
    method: 'POST',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}

const getCharacters = (token) => {
  return fetch(`${api}/characters/user`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

const getEncounters = (token) => {
  return fetch(`${api}/encounters`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json())
}

export const getInitialData = (userId, token) => {
  return Promise.all([
    getCharacters(token),
    getEncounters(token)
  ])
  .then(([charactersReponse, encountersResponse]) => {
    const { characters } = charactersReponse
    const { encounters } = encountersResponse
    return { characters, encounters}
  })
}

export const verifyToken = (token) =>
  fetch(`${api}/users/verifyToken`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(res => {
    if (res.status === 401) {
      throw new Error("Token Invalid")
    }
    return res.json()
  })
