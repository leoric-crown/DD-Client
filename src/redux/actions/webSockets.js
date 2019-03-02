import { CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER} from './characters'
const messageTypes = [CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER]
const socket = new WebSocket('ws://localhost:5000/ws/echo')

export const webSocketInit = store => {
    messageTypes.forEach(type => {
        socket.addEventListener(type, payload => {
            store.dispatch({ type, payload })
        })
    })
}
export const emit = (type, payload) => {
    socket.send(type, payload)
}