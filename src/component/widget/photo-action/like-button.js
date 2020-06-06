import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components';
import { like } from '../../../container/redux/actions/likes-actions/likes-action-creator';
import isIncludedInArray from '../../../utilities/isIncludedInArray';


const StyledLike = styled.svg`
    fill: transparent;
    stroke: ${props => props.currentlyViewingPhoto ? '#222' : '#fff'};
    stroke-width: 1.5;
    position: relative;
    cursor: pointer;
    padding: 3px;
    @media(max-width: 768px){
        stroke: #222;
    }

`
const LikeButton = (props)=>{
   const { payload, currentlyViewingPhoto, state: { likedPhotos } = {} , dispatch } = props
    
    /* If photo id matches with ones in store, 
    mark as liked. meanwhile liking an already 
    liked picture unlikes it */
    
    const isLiked = isIncludedInArray( likedPhotos , payload)    
    const eventHandler = ()=>{
        dispatch(like(payload))
    }  
    
    // Switch between liked and unliked icons
    const style = isLiked ? {
        fill: '#f00',
        stroke: '#f00'
    } : null


    return(
        <StyledLike
            currentlyViewingPhoto={currentlyViewingPhoto}
            style={style}
            title={ isLiked ? 'Remove from favourite' : 'Add to favourite'} 
            onClick={eventHandler} 
            className='like'
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="-1 0 30 30">
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
        </StyledLike>
    )
}



const mapStateToProps = (state) =>{
    return{
        state:  {...state.like},
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch: (action)=>{
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)