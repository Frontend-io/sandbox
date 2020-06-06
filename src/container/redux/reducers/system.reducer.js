import * as actions from '../actions/system-action/system-action'

const initialState = {
    isModalOpen: false,
}

const SystemReducer = ( state= initialState, action )=>{
    const { type, payload } = action

    switch(type){
        case actions.TOGGLE_MODAL:
            return{
                ...state,
                isModalOpen: payload
            }
        default: return state
    }
}


export default SystemReducer