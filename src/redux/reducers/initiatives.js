import {
    RECEIVE_INITIATIVES,
    CREATE_INITIATIVE,
    REMOVE_INITIATIVE,
    UPDATE_INITIATIVE_STAMP,
    UPDATE_INITIATIVE,
    SET_NEXT_TURN
} from '../actions/initiatives'

const defaultState = {
    list: null,
    newTurn: null
}

export default function Encounters(state = defaultState, action) {
    switch (action.type) {
        case RECEIVE_INITIATIVES:
            return {
                ...state,
                list: action.initiatives,
                count: action.count
            }
        case CREATE_INITIATIVE:
            return {
                ...state,
                list: [...state.list, ...action.initiatives]
            }
        case REMOVE_INITIATIVE:
            return {
                ...state,
                list: state.list.filter(initiative => {
                    return initiative._id !== action.id
                })
            }
        case UPDATE_INITIATIVE_STAMP:
            return {
                ...state,
                list: state.list.map(initiative => {
                    if (initiative._id === action.id) {
                        action.payload.forEach(update => {
                            initiative.characterStamp[update.propName] = update.value
                        })
                        return initiative
                    }
                    return initiative
                })
            }
        case UPDATE_INITIATIVE:
            return {
                ...state,
                list: state.list.map(initiative => {
                    if (initiative._id === action.id) {
                        action.payload.forEach(update => {
                            initiative[update.propName] = update.value
                        })
                        return initiative
                    }
                    return initiative
                })
            }
        case SET_NEXT_TURN:
            if (action.prevActive && action.prevActive === action.newActive._id) return { ...state }
            const list = [...state.list]
            if (action.deleted) {
                list.splice(list.map(i => i._id).indexOf(action.deleted), 1)
            }
            return {
                ...state,
                newTurn: action.newActive._id,
                list: list.map(i => {
                    if (action.prevActive && i._id === action.prevActive._id) {
                        i.active = false
                        return i
                    } else if (action.newActive && i._id === action.newActive._id) {
                        i.active = true
                        return i
                    }
                    return i
                })
            }
        default:
            return { ...state }
    }

}