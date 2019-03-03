import io from 'socket.io-client'
import config from '../../config.json'
import { appId } from '../../utils/id'
import { characterWsActions } from './characters'
import { encounterWsActions} from './encounters'
import { initiativeWsActions} from './initiatives'
const socketHost = config.WS

const messageTypes = [
    ...characterWsActions,
    ...encounterWsActions,
    ...initiativeWsActions
]
const socket = io(socketHost)

export const webSocketInit = store => {
    messageTypes.forEach(type => {
        socket.on(type, payload => {
            console.log('receiving: ', type, payload)
            if(store.getState().User.authenticated && (!payload.appId || payload.appId !== appId)) {
                store.dispatch({ type, ...payload })
            }
        })
    })
}
export const emit = (type, payload) => {
    socket.emit(type, payload)
}