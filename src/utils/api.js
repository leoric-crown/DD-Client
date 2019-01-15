
const api = "http://localhost:5000"

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
