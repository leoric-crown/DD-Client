import config from '../config'
import { appId } from '../utils/id'
const api = config.API

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const request = (method, body, token = false) => {
  const request = {
    method,
    headers: !token
      ? headers
      : {
        ...headers,
        Authorization: `Bearer ${token}`,
        appId
      }
  }

  if (body) request.body = body
  return request
}

export const login = payload =>
  fetch(`${api}/users/login`, request('POST', JSON.stringify(payload)))
    .then(res => res.json())
    .catch(e => console.log(e))

export const signup = payload =>
  fetch(`${api}/users/signup`, request('POST', JSON.stringify(payload)))
    .then(res => res.json())
    .then(data => data)
    .catch(e => console.log(e))

export const fbLogin = accessToken =>
  fetch(`${api}/users/auth/facebook`, request('POST', false, accessToken)).then(
    res => res.json()
  )

export const postCharacter = (token, payload) => {
  let data = new FormData()
  Object.entries(payload).forEach(keyValue => {
    data.append(keyValue[0], keyValue[1])
  })
  return fetch(`${api}/characters`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      appid: appId
    },
    body: data
  }).then(res => res.json())
}

export const deleteCharacter = (token, id) => {
  return fetch(`${api}/characters/${id}`, request('DELETE', false, token)).then(
    res => res.json()
  )
}

const getCharacters = token => {
  return fetch(`${api}/characters`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}

const getConditions = token => {
  return fetch(`${api}/conditions`, request('GET', false, token)).then(
    res => res.json()
  )
}
export const postEncounter = (token, payload) => {
  return fetch(
    `${api}/encounters`,
    request('POST', JSON.stringify(payload), token)
  ).then(res => res.json())
}

export const patchByUrl = (token, payload, url) => {
  return fetch(url, request('PATCH', JSON.stringify(payload), token)).then(
    res => res.json()
  )
}

export const changeActiveEncounter = (token, { id, prevActiveId }) => {
  return fetch(
    `${api}/encounters/${id}/setActive`,
    request('POST', JSON.stringify({ id, prevActiveId }), token)
  ).then(res => res.json())
}

export const deleteEncounter = (token, id) => {
  return fetch(`${api}/encounters/${id}`, request('DELETE', false, token)).then(
    res => res.json()
  )
}

const getEncounters = token => {
  return fetch(`${api}/encounters`, request('GET', false, token)).then(res =>
    res.json()
  )
}

export const deleteInitiative = (token, id) => {
  return fetch(
    `${api}/initiatives/${id}`,
    request('DELETE', false, token)
  ).then(res => res.json())
}

export const bulkDeleteInitiatives = (token, payload) => {
  return fetch(
    `${api}/initiatives/bulk`,
    request('DELETE', JSON.stringify(payload), token)
  ).then(res => res.json())
}

export const postInitiative = (token, payload) => {
  return fetch(
    `${api}/initiatives`,
    request('POST', JSON.stringify(payload), token)
  ).then(res => res.json())
}

export const setNextTurn = (token, encounterId, deletePrevious) => {
  return fetch(
    `${api}/initiatives/${encounterId}/nextTurn`,
    request('POST', JSON.stringify({ deletePrevious }), token)
  ).then(res => res.json())
}

const getInitiatives = token => {
  return fetch(`${api}/initiatives`, request('GET', false, token)).then(res =>
    res.json()
  )
}

export const getInitialData = (user, token) => {
  return Promise.all([
    getCharacters(token),
    getEncounters(token),
    getInitiatives(token),
    getConditions(token)
  ]).then(
    ([charactersResponse,
      encountersResponse,
      initiativesResponse,
      conditionsResponse]) => {
      const { characters } = charactersResponse
      const { encounters } = encountersResponse
      const { initiatives } = initiativesResponse
      const { conditions } = conditionsResponse
      return { characters, encounters, initiatives, conditions }
    })
}

export const verifyToken = token =>
  fetch(`${api}/users/verifyToken`, request('POST', false, token))
    .then(res => {
      if (res.status === 401) {
        throw new Error('Token Invalid')
      }
      return res.json()
    })

export const verifyEmail = token =>
  fetch(`${api}/users/verifyEmail`, request('POST', false, token))
    .then(res => {
      return res.json()
    })
    .catch(err => err)


export const restorePassword = (password, token) => {
  return fetch(
    `${api}/users/resetPassword`,
    request('POST', JSON.stringify({ password }), token)
  )
    .then(res => res.json())
    .catch(err => err)
}

export const forgotPassword = (email, callback) => {
  return fetch(
    `${api}/users/forgotPassword`,
    request('POST', JSON.stringify({ email, callback }))
  )
    .then(res => res.json())
    .catch(err => err)
}
