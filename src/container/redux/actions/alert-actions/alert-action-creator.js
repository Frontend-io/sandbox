import * as actions from './alert-actions'



export const logMessage = (payload)=>{
    return{
        type: actions.LOG_MESSAGE,
        payload
    }
}

export const clearMessage = (payload)=>{
    return{
        type: actions.CLEAR_MESSAGE,
        payload
    }
}