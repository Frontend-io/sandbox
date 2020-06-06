

const calculateValidUploadProgress = (payload)=>{

    let averageTotalProgress = 0;
    let length = 0;

    for(let upload in payload){
        let index = payload[upload]
        if( !index.error ){
            length += 1
            averageTotalProgress += index.progress
        }
    }
    return parseInt( averageTotalProgress/length  )
}

export default calculateValidUploadProgress