import React, { useState } from 'react';
import styled from 'styled-components';



const StyledUploader = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    margin-bottom: 30px;
    padding: 30px 0px;
    border: 3px dotted #ccc;
    box-shadow;
    box-shadow: 0px 10px 30px rgba(0,0,0,0.08);
    border-radius: 3px;
    position: relative;
    &:active{
        box-shadow: 0px 10px 5px rgba(0,0,0,0.08);
        transition: box-shadow .3s;
    }

    & h2{
        font-size: 20px;
    }

    &  input[type='file']{
        width: 100%;
        visibility: none;
        opacity: 0;
        min-height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        cursor: pointer;
    }


    &  input[type='file']:disabled{
        cursor: not-allowed
    }

    @media(max-width: 500px){
        & h2{
            font-size: 16px;
        }
    }
` 

const Uploader = ({handleUpload, uploading})=>{
    
    const [ file ] = useState('')
    

    
    return(
        <StyledUploader className='link uploader' >
            <input 
                disabled={uploading ? 'disabled' : ''}
                value={file}
                onChange={handleUpload} 
                type='file' 
                accept="image/*"
                name='browseFileForUpload' 
            />
            <h2 className='link centered-text'>Browse for your photos</h2>
            <p className='no-margin'>You can upload more than one photos</p>
        </StyledUploader>
    )
}

export default Uploader