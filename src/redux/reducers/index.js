import { combineReducers } from 'redux'
import User from './User'
import Characters from './characters'
import Encounters from './encounters'
import Initiatives from './initiatives'
import Errors from './errors'
import Conditions from './conditions'

export default combineReducers({
  User,
  Characters,
  Encounters,
  Initiatives,
  Errors,
  Conditions
})
