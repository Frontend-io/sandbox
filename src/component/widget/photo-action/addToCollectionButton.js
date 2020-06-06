import React from 'react'
import styled from 'styled-components';


const StyledAddToCollectionButton = styled.svg`
    fill:  ${props => props.currentlyViewingPhoto ? '#222' : '#fff'};;
    margin-right: 0px;
    padding: 3px;
    cursor: pointer;
    
    @media(max-width: 768px){
        fill: #222;
    }
` 

const AddToCollectionButton = ({handleEvent,  currentlyViewingPhoto})=>{

    const eventHandler = (e)=>{
        handleEvent(e)
    }


    return(
        <StyledAddToCollectionButton 
            title="Add to collection"
            data-modal-mode='collectionModal'
            onClick={eventHandler}
            className='add'
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            currentlyViewingPhoto={currentlyViewingPhoto}
            viewBox="0 0 24 24">
            <path 
                data-modal-mode='collectionModal'
                onClick={eventHandler}
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
        </StyledAddToCollectionButton> 
    )
}



export default AddToCollectionButton