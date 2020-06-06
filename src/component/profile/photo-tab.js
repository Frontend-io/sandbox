import React from 'react';
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import styled from 'styled-components';
import { dataLoop } from './profile';
import { ReactComponent as PaintSvg } from '../../assets/paint.svg'
import Photo from '../widget/photo/photo';
import randID from '../../utilities/randID';
import Loader from '../widget/loader/loader';


export const StyledResponsivePhotoTab = styled.div`
    columns: 3;
    column-gap: 10px;
    @media(max-width: 1000px){
        columns: 2
    }
    @media(max-width: 600px){
        columns: 1
    }
`
const StyledUploadInit = styled.div`
    margin-top: 50px;
    text-align: center;
    padding: 20px;
    & svg{
        transform: scale(3);
        fill: #aaa
    }
    & p {
        padding-top: 8px;
        font-size: 1.2em;
        color: #555
    }
    & button {
        background: var(--darker-blue);
        color: #fff;
        padding: 10px 20px;
    }
`



const PhotoTab = (props)=>{
    const { history, state } = props
    const loading = false
    


    
    
    return(
        <>
           {
               dataLoop /*photo*/ && !loading ? 
               <StyledResponsivePhotoTab>
                   {
                       dataLoop.map( item =>{
                           return <Photo payload={item} key={randID()}  />
                       })
                   }
                </StyledResponsivePhotoTab>
                :
                !loading &&
                <StyledUploadInit>
                    <PaintSvg />
                    <p>Let's get your albums interesting!</p>
                    <button onClick={()=>{history.push('/upload')}} className='btn'>START UPLOADING</button>
                </StyledUploadInit>
           }
           {
               loading && 
               <Loader message='Getting things ready...' />
           }
        </>
    )
}





const mapStateToProps = (state) => ({
    state: state.photo
})


export default connect(mapStateToProps)(withRouter(PhotoTab))
