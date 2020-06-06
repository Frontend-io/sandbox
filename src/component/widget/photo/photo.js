import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import View from '../../view-image/view'
import Modal from '../modals/modal';
import getAttribute from '../../../utilities/getAttribute'
import LikeButton from '../photo-action/like-button';

import AddToCollectionButton from '../photo-action/addToCollectionButton';
import AddToCollection from '../addToCollectionModal/addToCollectioModal'
import PhotoLocation from '../photo-action/location';
import screenSize from '../../../utilities/checkScreenSize';
import { loadPreview } from '../../../container/redux/actions/photo-view-action/photo-view-action-creator';

import StyledPhoto from './photo.style'



const Photo = (props)=>{
    
    const { 
        location: { pathname } = {},
        payload, 
        currentlyViewingPhoto, 
        inViewMode, 
        state: { 
            view: { 
                preview 
            } 
        } = {}, 
        dispatch 
    } = props    

    const photographer = 'Jefferson Mush'
    const demoPhoto = ['https://images.pexels.com/photos/3812041/pexels-photo-3812041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800','https://images.pexels.com/photos/3783044/pexels-photo-3783044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800','https://images.pexels.com/photos/4045428/pexels-photo-4045428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
    const image = demoPhoto[Math.round( ( Math.random() * (demoPhoto.length - 1) ) )]

    const currentPageRoute = pathname.split('/')[1]
    const [ viewModal, setViewModal ] = useState({
        view: false,
        collectionModal: false,
    })

   

    const eventHandler = (e)=>{
        const name = getAttribute(e.target, 'modal-mode')

        // Toggle between collection modal and view modal
        if( name === 'collectionModal'){
            setViewModal({
                collectionModal: true,
                view: false
            }) 
        }else if( name === 'imagePreview' ){
            // Make sure no reoccuring modal window is open if it is already open, but still push the image to state to update the current UI
            if( !inViewMode ){
                setViewModal({
                    collectionModal: false,
                    view: true
                })
            }
             
            // Ensure the current image in view does not dispatch another action
            if( !currentlyViewingPhoto && payload !== preview ){
                dispatch(loadPreview(payload))
            }
        }       
    }
    
   
    // Handle Height adjustment for collectionModal
    const [ fixHeight, setFixHeight ] = useState(false)
    const handleFixHeight = ()=>{
        setFixHeight(true)
    }

    
    // Reset all local state modal status
    const resetModalState = ()=>{
        setViewModal({
            collectionModal: false,
            view: false
        }) 
        setFixHeight(false)

        // Reset the URL back to pages's route
        window.history.pushState( {}, '', `/${currentPageRoute}`)
    }

    // Enable image preview to be displayed in a modal on desktop devices only
    const { outerWidth } = screenSize()

    // Load currently viewed image in URL to enable link sharing
    useEffect(()=>{
        if( inViewMode && currentlyViewingPhoto ){
            window.history.pushState({}, '', `/images/${preview}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preview])

    const extraClass = currentlyViewingPhoto ? 'currentPhoto' : 'neutral'



    

    return(
            <>
                {
                    <StyledPhoto  inViewMode={inViewMode} className={`${extraClass}`}>
                        
                        {
                            ( outerWidth <= 768 && !currentlyViewingPhoto ) ?
                            <Link to={`/images/${payload}`}>
                                <img 
                                    src={image} 
                                    alt={photographer} 
                                    data-url={'url'}
                                    className='payload' 
                                    title={''} 
                                />
                            </Link>
                            : 
                            <img 
                                src={image} 
                                alt={photographer} 
                                data-url={'url'}
                                data-modal-mode='imagePreview'  
                                className='payload' 
                                title={''} 
                                onClick={eventHandler}
                            />
                        }
                        
                        <ul className='no-wrap no-padding grid apart actions'>
                            <li className='no-wrap grid author'>
                                    <img src={image} alt={`${photographer}'s avatar`}/>
                                    <span className='no-margin grid col'>
                                        <Link to={'/user'} className='no-margin'>
                                            <p className='author-detail'>{photographer}</p>
                                        </Link>
                                        <PhotoLocation location='Lagos, NG' />
                                    </span>
                            </li>
                            <li className='no-wrap grid apart action'>
                                <LikeButton currentlyViewingPhoto={currentlyViewingPhoto} payload={payload}  />
                                <AddToCollectionButton currentlyViewingPhoto={currentlyViewingPhoto} handleEvent={eventHandler} />
                            </li>
                        </ul>
                        <span className='absolute backdrop'></span>


                        {/* Modals */}
                        {
                            viewModal.view && 
                            <Modal 
                                typePlain
                                resetModalState={resetModalState}
                                isOpen={viewModal.view}
                                title={'Colourful terrain of China'} 
                            >
                                <View />
                            </Modal>
                        }
                        {
                            viewModal.collectionModal && 
                            <Modal
                                inViewMode={ inViewMode }
                                adjustHeight = {fixHeight}
                                resetModalState={resetModalState}
                                isOpen={viewModal.collectionModal}
                                title='Add image to collection'
                            >
                                <AddToCollection payload={payload} handleFixHeight={handleFixHeight} />
                            </Modal>
                        }
                    </StyledPhoto>
                }
            </>
        )
}



const mapStateToProps = state =>{
    return{
        state: {
            view: state.view, 
        }
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        dispatch: (action)=>{
            dispatch(action)
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Photo))