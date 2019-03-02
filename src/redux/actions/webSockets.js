import { CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER} from './characters'
import io from 'socket.io-client'
import { appId } from '../../utils/id'
const messageTypes = [CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER]
const socket = io('ws://localhost:5000')

export const webSocketInit = store => {
    messageTypes.forEach(type => {
        socket.on(type, payload => {
            if(payload.appId !== appId) store.dispatch({ type, ...payload })
        })
    })
}
export const emit = (type, payload) => {
    socket.emit(type, payload)
}