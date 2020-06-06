import * as actions from './upload-actions'


export const queue_upload = (payload)=>{
    return{
        type: actions.QUEUE_UPLOAD,
        payload
    }
}


export const editUpload = (payload)=>{
    return{
        type: actions.EDIT_UPLOAD,
        payload
    }
}

