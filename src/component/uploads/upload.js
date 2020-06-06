import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import generatePhotoPreview from '../../utilities/generatePhotoPreview';
import { connect } from 'react-redux'
import Uploader from './upload-widgets/uploader';
import UploadFile from './upload-widgets/uploadfile';
import TopBar from '../widget/topbar/top-bar';
import PublishBar from './upload-widgets/publish-bar';
import MessageAlert from '../widget/messages-alert/message';
import randID from '../../utilities/randID';
import { queue_upload } from '../../container/redux/actions/upload-action/upload-action-creator';
import { logMessage } from '../../container/redux/actions/alert-actions/alert-action-creator';


const StyledUpload = styled.div`
    padding-bottom: 150px;
    margin: 0px 0px;
    & .top-bar{
        border-bottom: 1px solid #eee
    }
    & .upload-content{
        margin-top: 30px;
    }
    
` 





const Upload = (props)=>{

    const { 
        dispatch, 
        state : { 
            uploading, 
            uploadComplete, 
            uploadProgressReport, 
            message
        } = {} 
    } = props

     // Local state to hold uploads for initialisation
     const [ uploadFiles, setUploadFiles ] = useState([])
     const uploadLength = uploadFiles.length || null
    
    
    // Upload errors
    const [ uploadError, setUploadError ] = useState({
        isUploadError: false,
        errorMessage: {
            title: '',
            message: ''
        }
    })

    
    // Initiate upload
    const handleUpload = (e)=>{
        const { name , files } = e.target
        const { title , size, type, preview, sizeInKB} = generatePhotoPreview(e.target.files) || {}
        const uploadType = type ? type.split('/')[0] : null
        
        if( name === 'browseFileForUpload' ) {
            if( uploadType === 'image' ){
                if(sizeInKB /*>= 5000*/){
                    // Clear error
                    setUploadError({
                        isUploadError: false,
                        errorMessage: {
                            title: '',
                            message: ''
                        }
                    })
                    // QUEUE FILE FOR UPLOAD
                    setUploadFiles([
                        {
                            title: '',
                            tags: '',
                            description: '',
                            raw: files[0],
                            preview,
                            name: title,
                            size,
                            id: randID()
                        },
                        ...uploadFiles,
                    ])
                }else{
                    setUploadError({
                        isUploadError: true,
                        errorMessage: {
                            title: 'Files size is invalid',
                            message: 'Image size too small. Image size must be a minimum of 5MB'
                        }
                    })
                }

            }else if( uploadType !== null ){
                setUploadError({
                    isUploadError: true,
                    errorMessage: {
                        title: 'File type not supported',
                        message:  `You cannot upload file type ${type}, only images are allowed!`
                    }
                })
            }
        }       
        
    }

    // DISPATCH UPLOADS QUEQUE  
    const handleDispatch = ()=>{
        // Make sure all errors are handled before upload is initiated
        if(!uploadError.isUploadError){
            for( let file in uploadFiles ){
                let index = uploadFiles[file]
                dispatch(queue_upload(index))
            }
        }
    }

    // CLEAR QUEUE IF UPLOAD COMPLETE
    useEffect(()=>{
        setUploadFiles([])
    }, [uploadComplete])

    // Handle upload alerts and notifications
    useEffect(()=>{
        message && dispatch(logMessage(message + '. Taking you to your profile'))
    }, [message, dispatch])

    // Redirect to profile if upload is successfull
    useEffect(()=>{
       uploadComplete &&  
       setTimeout(()=>{
            props.history.push('/profile')
        }, 5000)
    }, [uploadComplete, props.history])





    
    return(
        <StyledUpload>
            <TopBar 
                customHeight='50px'
                title="Upload your photos" 
                description="You are few steps away from creating a perfect gallery for yourself and your followers" 
            />
            <div className='upload-content'>
                <div className='in-container'>
                    <Uploader handleUpload={handleUpload} uploadLength={uploadLength} uploading={uploading}/>
                    {
                        uploadError.isUploadError ?
                            <MessageAlert 
                                type='error' 
                                icon='warning' 
                                title={uploadError.errorMessage.title} 
                                message={uploadError.errorMessage.message} 
                            />
                        : null
                    }
                    {
                        uploadFiles ?
                        <div className='upload-list'>
                            {
                                uploadFiles.map( (item, index) =>{
                                    return(
                                        <UploadFile 
                                            data={{ ...item, index, uploadLength, uploading, dispatch, uploadFiles, uploadProgressReport }} 
                                            setUploadFiles={setUploadFiles} 
                                            key={randID()} 
                                        />
                                    )
                                } )
                            }
                        </div>
                        : null
                    }
                </div>
            </div>
            <PublishBar 
                uploadLength={uploadLength} 
                handleDispatch={handleDispatch} 
                uploading={uploading} 
                uploadProgress={uploadProgressReport}
            />
        </StyledUpload>
    )
}


const mapStateToProps = state =>{
    return{
        state: state.upload
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch: action => dispatch(action)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)