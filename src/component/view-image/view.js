import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Void from '../widget/void-content/void';
import Loader from '../widget/loader/loader';
import Photo from '../widget/photo/photo';
import { dataLoop } from '../profile/profile';
import { StyledResponsivePhotoTab } from '../profile/photo-tab';
import randID from '../../utilities/randID';


const StyledView = styled.div`
    scroll-behavior: smooth;
    & .photo-misc{
        padding: 20px;
        box-sizing: border-box
    }
    
    & > * {
        border-bottom: 1px solid #eee;
        margin: 0px auto !important;
    }
    & .photo-description{
        min-height: 20px;
        box-sizing: border-box;
    }  
    @media(min-width: 768px){
        & .photo-misc {
            padding: 20px 40px;
        }
        & .photo-misc .title{
            font-size: 30px 
        }
    } 
`

const View = (props)=>{
    const { 
        state: { 
            message, 
            loading,   
            preview
        } = {}, 
        match: { params : { id }  },
    } = props

    const currentPhotoId = id
   

    // Make sure screen view is started from the top on load or image change
    const scrollToTop = useRef(null)
    useEffect(()=>{
        scrollToTop.current.scrollIntoViewIfNeeded()
    }, [preview, currentPhotoId])
    

    
    
    
    return(
        <React.Fragment>
            {
                !loading  && 
                    <StyledView className="white view">
                        <div ref={scrollToTop} className='photo-misc photo-head'>
                            <h2 className='title'>Couple in the kitchen eating breakfast </h2>
                        </div>
                        <Photo payload={12} currentlyViewingPhoto={true} inViewMode={true} />
                        <div className='photo-misc photo-description'>
                            People viewing a well
                        </div>
                        <div className='photo-misc related-section'>
                            Related
                            <StyledResponsivePhotoTab>
                            {
                                dataLoop.map(j=>{
                                    return <Photo payload={j} inViewMode={true} key={randID()}/>
                                })
                            }
                            </StyledResponsivePhotoTab>
                        </div>
                    </StyledView> 
            }

            {
                loading && <Loader />
            }

            {/* {
                !loading && message &&
                <Void title={message}/>
            } */}
        </React.Fragment>
    )
}



const mapStateToProps = state =>{
    return{
        state: state.view
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch: (action)=>{
            dispatch(action)
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(View))