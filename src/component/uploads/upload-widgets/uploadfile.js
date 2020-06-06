/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Progress } from './publish-bar';



const StyledUploadFile = styled.div`
    display: flex;
    margin-top: 50px !important;
    position: relative;
    box-shadow: 0px 3px 10px rgba(0,0,0,.08);
    padding: 15px;
    box-sizing: border-box;
    border-radius: 3px;

    & form .update-btn {
        padding: 15px 40px;
        background: var(--darker-blue);
        color: #fff;
        min-width: 30%
    }

    & .upload-index{
        position: absolute;
        background: #eee;
        height: 40px;
        width: 40px;
        padding:3px 0px 0px 12px;
        box-sizing: border-box;
        border-radius: 100%;
        top: 40%;
        left: 50%;
        transform: translateX(-50%, -50%);
        opacity: .5;
        color: #aaa;
        font-size: 30px;
    }
    & .upload-index:hover{
        background: var(--red);
        color: #fff;
        opacity: 1
    }

    & > * {
        flex: 1;
    }
    & .img{
        max-width: 50%;
    }
    & img{
        margin-right: 20px;
        object-fit: contain;
    }
    & .img small {
        word-break: break-all;
        max-width: 85%
    }
    & .uploadError-overlay{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: rgba(225,225,225, .8);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        top: 0%;
        left: 0%;
        text-align: center
    }
    & .uploadError-overlay p {
        font-size: 20px;
        color: var(--red);
        font-weight: 600;
    }

    @media(max-width: 768px){
        flex-direction: column;
        & img{
            margin-right: 0px;
            flex: unset !important
        }
        & .img{
            max-width: 100%;
        }
    }

` 


const UploadFile = (props)=>{
    const { 
        setUploadFiles,
        data : { 
            preview, 
            name, 
            size, 
            id,
            index, 
            uploadFiles,
            uploading,
            uploadProgressReport
        } = {} 
    } = props


    // OBJECT OF PARTICULAR UPLOAD
    const uploadIndex = uploadFiles[index]  
    // PROGRESS REPORT OF PARTICULAR UPLOAD
    const { progress, error, message } = uploadProgressReport[index] || {}

    // State for the most updated index
    const [ meta, setMeta ] = useState({
        title: '',
        tags: '',
        description: '',
        id: index
    })

    // Update the current UploadIndex with values from parent State
    useEffect(()=>{
        setMeta({
            ...meta,
            ...uploadIndex,
        })
    },[uploadFiles])


    // LOAD UPLOAD DETAIL IN UPLOAD STATE
   useEffect(()=>{
    setMeta( meta =>{
            return {
                ...uploadFiles[index],
                ...meta,
            }
        })
    }, [uploadFiles, index])



    // EDIT USER DETAIL FUNCTION  To be refactored in future - Non mutative state
    const editUser = updated => {
		for (let index in uploadFiles) {
			if (uploadFiles[index].id.toString() === updated.id.toString()) {
				uploadFiles[index] = updated;
				break;
			}
		}
	};

    // UPDATE UPLOAD PROPERTIES
    const handleDataUpdate = (e)=>{
        e.persist()
        const { name, value } = e.target
        setMeta({
            ...meta,
            [name] : value
        })
    }

    // Push changes to upload index in state as values are updated
    useEffect(()=>{
        editUser(meta)
    }, [meta])

    // Delete upload
    const deleteUpload = ()=>{
        setUploadFiles((uploadFiles)=>{
            return uploadFiles.filter( f => f.id !== id)
        })
    }

    
   

    
    return(
        <StyledUploadFile className='equal grid'>
            <div className='relative img'>
                <img src={preview} alt='an' />
                <div className='no-wrap grid apart img-extra'>
                    <small>{name}</small>
                    <small><b>{size}</b></small>
                </div>
                {
                    !uploading ?
                    <span 
                        onClick={deleteUpload}
                        className='red link bordered upload-index' 
                        data-index={index}
                        title={`Delete Photo ${ uploadFiles.length - index }`}
                        > &times;
                    </span>
                    :
                    <Progress uploadError={error} progress={progress} />
                }
                {
                    uploading && error &&
                    <div className='uploadError-overlay'>
                        <p>{message}</p>
                    </div>
                }
            </div>
            <div className='file-meta'>
                <form>
                    <div className='field'>
                        <input 
                            disabled={ uploading ? 'disabled' : ''}
                            onChange={handleDataUpdate}  
                            value={meta.title}
                            data-index={index} 
                            type='text' 
                            name='title' 
                            placeholder='Photo title' 
                            className='form-fix' 
                            autoComplete='off'
                        />
                    </div>
                    <div className='field'>
                        <input 
                            disabled={ uploading ? 'disabled' : ''}
                            onChange={handleDataUpdate}   
                            value={meta.tags}
                            data-index={index} 
                            type='text' 
                            name='tags' 
                            placeholder='tags (optional)' 
                            className='form-fix'
                            autoComplete='off'
                        />
                    </div>
                    <div className='field'>
                        <textarea 
                            disabled={ uploading ? 'disabled' : ''}
                            onChange={handleDataUpdate}
                            value={meta.description}  
                            data-index={index} 
                            name='description' 
                            placeholder='Short description' 
                            className='form-fix'
                            autoComplete='off'
                        />
                    </div>
                </form>
            </div>
        </StyledUploadFile>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)