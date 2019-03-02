import { CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER } from './characters'
import { CREATE_ENCOUNTER, UPDATE_ENCOUNTER, REMOVE_ENCOUNTER, SET_ACTIVE_ENCOUNTER, CLEAR_ACTIVE_ENCOUNTER} from './encounters'
import { CREATE_INITIATIVE,
        UPDATE_INITIATIVE,
        REMOVE_INITIATIVE,
        SET_NEXT_TURN,
        UPDATE_INITIATIVE_STAMP
       } from './initiatives'
import io from 'socket.io-client'
import { appId } from '../../utils/id'
const characterActions = [CREATE_CHARACTER, UPDATE_CHARACTER, REMOVE_CHARACTER]
const encounterActions = [CREATE_ENCOUNTER, UPDATE_ENCOUNTER, REMOVE_ENCOUNTER, SET_ACTIVE_ENCOUNTER, CLEAR_ACTIVE_ENCOUNTER]
const initiativeActions = [CREATE_INITIATIVE, UPDATE_INITIATIVE, REMOVE_INITIATIVE, SET_NEXT_TURN, UPDATE_INITIATIVE_STAMP]
const messageTypes = [...characterActions, ...encounterActions, ...initiativeActions]
const socket = io('ws://localhost:5000')

export const webSocketInit = store => {
    messageTypes.forEach(type => {
        socket.on(type, payload => {
            console.log('receiving: ', type, payload)
            if(!payload.appId || payload.appId !== appId) {
                store.dispatch({ type, ...payload })
            }
        })
    })
}
export const emit = (type, payload) => {
    socket.emit(type, payload)
}