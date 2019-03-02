import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import { emit } from '../redux/actions/webSockets'

export default applyMiddleware(
  thunk.withExtraArgument({ emit })
)
