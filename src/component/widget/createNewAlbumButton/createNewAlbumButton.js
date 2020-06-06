import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../modals/modal';
import AddToCollection from '../addToCollectionModal/addToCollectioModal';


const StyledNewAlbumButton = styled.div`
    height: 200px;
    width: 200px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    padding: 50px 20px 20px 20px;
    text-align: center;
    align-self: center;
    box-sizing: border-box;
    position: relative;
    bottom: -10px;
    transition: .3s;
    & i {
        font-size: 50px;
    }
    & .new-album {
        font-size: 16px;
    }

    @media(max-width: 630px){
        display: flex;
        padding: 15px 20px;
        align-items: center;
        flex-wrap: no-wrap;
        height: 40px;
        width: fit-content;
        border: 1px solid #f2f2f2;
        & i {
            font-size: 30px;
        }
    }
`

const NewAlbumButton = ()=>{
    const [ toggleModal, setToggleModal ] = useState(false)
    const handleEvent = ()=>{
        setToggleModal(true)
    }
    const resetModalState = ()=>{
        setToggleModal(false)
    }
     
    
     return(
         <>
            <StyledNewAlbumButton onClick={handleEvent} className='link'>
                <i className='material-icons'>add</i>
                <p className='new-album'>Create new album</p>             
            </StyledNewAlbumButton>

            {
                toggleModal && 
                <Modal
                    isOpen={toggleModal}
                    resetModalState={resetModalState}
                    title='Create new collection'
                >
                    <AddToCollection type='create'  />
                </Modal>
            }
         </>
     )
 }

export default NewAlbumButton