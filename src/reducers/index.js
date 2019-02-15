import { combineReducers } from 'redux'
import User from './User'
import Characters from './characters'
import Encounters from './encounters'
import Initiatives from './initiatives'

export default combineReducers({
  User,
  Characters,
  Encounters,
  Initiatives
})
