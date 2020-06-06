import * as actions from './system-action'

export const toggleModal = (payload)=>{
    return{
        type: actions.TOGGLE_MODAL,
        payload
    }
}
