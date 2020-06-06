import React from 'react';
import styled from 'styled-components';
import calculateValidUploadProgress from '../../../utilities/calculateValidUploadProgress';


const StyledPublishBar = styled.div`

    position: fixed;
    bottom: 0;
    let: 0;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-top: 1.2px solid #eee;
    animation: withdraw .3s ease-out;
    box-shadow: 0px -5px 20px rgba(0,0,0,.08);
    & .btn-wrap{
        display: flex;
    }

    @keyframes withdraw{
        from{
            bottom: -100px
        }
        to{
            bottom: 0px
        }
    }

    & button.publish-btn{
        margin: 0px auto; 
        padding: 20px;
        background: var(--light-green);
        max-width: 50%;
        color: #fff;
        font-size: 18px
    }

    @media(max-width: 500px){
       & button.publish-btn{
            max-width: 90%;
            padding: 15px;
        }
        
    }
` 
const StyledProgressBar = styled.div`
    height: 5px;
    width: 100%;
    background: rgba(0, 200, 0, .3);
    & .loader{
        height: 5px;
        background: var(--light-green);
		position: relative;
		box-sizing: border-box;
		transition: width .5s ease-in;
    }
    & .loader:before{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(to  right, rgba(0, 200, 0, .3), rgba(0, 100, 0, .8));
		animation: purge 6s infinite 
    }
    
    @keyframes purge{
		0%{
			opacity: 0;
			width: 0%;

		}
		50%{
			opacity: .5
		}
		100%{
			opacity: 0;
			width: 100%;
		}
	}
`


export const Progress = ({progress, uploadError})=>{

    // Upload State indicator
    const progresStyle= {
        container: {
            background: `${uploadError ? 'rgba(200, 0, 0, .3)' : ''}`
        },
        loader: {
            width: `${progress}%`,
            background: `${uploadError ? 'var(--red)' : ''}`
        }
    }


    return(
        <StyledProgressBar style={progresStyle.container}>
            <div style={progresStyle.loader} className="loader"></div>
        </StyledProgressBar>
    )
}

const PublishBar = (props)=>{
    const {
        handleDispatch, 
        uploadLength, 
        uploading, 
        uploadError, 
        uploadProgress
    } = props


        // Get  and sum all uploads progress
       const validUploadsTotalProgress = calculateValidUploadProgress(uploadProgress) || null


    return(
        <>
            {
                uploadLength ? 
                <StyledPublishBar className='publish-bar'>
                    {
                        uploading &&
                        <Progress progress={validUploadsTotalProgress} uploadError={uploadError} />
                    }
                    <div className='padded-20 btn-wrap'>
                        <button 
                            disabled={uploading ? 'disabled' : ''}
                            onClick={handleDispatch} 
                            className='publish-btn full-width'> 
                            {!uploading ? 'Publish' : 'Publishing'} { uploadLength } { uploadLength > 1 ? `photos` : 'photo'}{uploading ? ', please wait...' : null}
                        </button>
                    </div>
                </StyledPublishBar>
                : 
                null
            }
        </>
    )
}

export default PublishBar