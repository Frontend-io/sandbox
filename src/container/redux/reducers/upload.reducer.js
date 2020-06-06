import 
    { 
        QUEUE_UPLOAD, 
    }
from "../actions/upload-action/upload-actions";


const INITIAL_STATE = {
    message: '',
    currentUpload: [],
    uploading: false,
    uploadComplete: false,
    uploadProgressReport: [
        {progress: 50, error: true, message: 'Unknown error'},
        {progress: 90, error: false},
        {progress: 90, error: false, message: 'Network issues'},
    ]
}

const UploadReducer = ( state = INITIAL_STATE, action)=>{
    const { type, payload } = action

    switch(type){
        case QUEUE_UPLOAD:
            return{
                ...state,
                uploading: true,
                currentUpload: [
                    payload,
                    ...state.currentUpload,
                ]
            }
        default: 
            return state
    }
}

export default UploadReducer