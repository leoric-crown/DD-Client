import { combineReducers } from 'redux'
import User from './User'
import Characters from './characters'
// import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  User,
  Characters
})
