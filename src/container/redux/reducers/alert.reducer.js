import * as actions from '../actions/alert-actions/alert-actions'



const INITIAL_STATE = {
    message: []
}



const AlertReducer = (state = INITIAL_STATE, action)=>{
    const { type, payload } = action
    switch(type){
        case actions.LOG_MESSAGE:
            return{
                ...state,
                message: [
                    payload,
                    ...state.message
                ]
            }
        case actions.CLEAR_MESSAGE:
            return {
                ...state,
                message: payload === "all" ? [] : state.message.filter( m => state.message.indexOf(m) !== payload)                
            }
        default: 
                return state
    }

}

export default AlertReducer