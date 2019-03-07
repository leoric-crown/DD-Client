import { 
    RECEIVE_CONDITIONS
} from '../actions/conditions'

const defaultState = {
    list: null
}

export default function Conditions(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_CONDITIONS:
            return {
                ...state,
                list: action.conditions
            }
        default:
            return { ...state }
    }
}