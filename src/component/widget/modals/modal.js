import React, { useEffect, useState, useRef } from  'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';



export const StyledOverlay = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    background: -webkit-linear-gradient(top, rgba(200, 200, 200, .7), rgba(0, 0, 0, .9));
    transition: opacity .5s;
    z-index: 999999;
` 
const StyledModal = styled.div`
    color: #222;
    border-radius: 10px;
    min-width: 100px;
    width: 100%;
    max-width: 700px;
    background: #fff;
    position: ${props => props.inViewMode ? ' ' : ' fixed'};
    top: ${ props => props.adjustHeight ? '2%' : '20%'};
    z-index: 9999999;
    overflow: hidden;
    transition: .4s;
    animation: appear .3s ease-out;
    @keyframes appear {
        from {
            opacity: 0;
            top: 30%
        }
        to{
            opacity: 1;
            top: ${props => !props.adjustHeight ? '20%' : ''}
        }
    }
    & > * {
        padding: 20px;
    }
    & .modal-head{
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: center
    }
    & .modal-foot {
        border-top: 1px solid #ddd;
        padding-top: 10px;
        text-align: center; 
        cursor: pointer;
    }
    & .modal-foot:hover{
        background: #f2f2f2;
    }
    & .modal-foot:hover span{
        color: #000
    }

    
    @media(max-width: 768px){
        width: 90%;
        max-width: 500px
    }
`
const TypePlainModal = styled.div`
    position: fixed;
    top: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    height: 100vh;
    width: 100%;
    & > *:not(span){
        overflow-y: auto;
        width: 90%;
        height: 100%;
    }
    & .close{
        position: fixed;
        top: -5px;
        right: 0px;
        font-size: 40px;
        color: #000;
        cursor: pointer;
        height: 40px;
        width: 40px;
        background: white;
        text-align: center;
        z-index: 99;
    }

    animation: show .3s ease-out;
    @keyframes show {
        from {
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @media(max-width: 768px){
        & > *:not(span){
            overflow-y: auto;
            width: 100%;
            height: 100%;
        }
        & > span {
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
        }
    }
`

const modalRoot = document.getElementById('modals')

const Modal = (props)=>{
    const {  
        isOpen, 
        typePlain, 
        children, 
        adjustHeight, 
        title, 
        resetModalState,
        inViewMode,
    } = props



    // Close modal with overlay and button
    const [ isModalOpenAlt, setIsModalOpenAlt ] = useState(false)
    // Update internal modal state with props
    useEffect(()=>{
        setIsModalOpenAlt(true)
    }, [isOpen])

    // Update modal position in view mode because of unexpected displacement
    const modalRef = useRef(null)
    useEffect(()=>{
        if( modalRef.current && inViewMode ){
            modalRef.current.style.position = 'fixed'
        }
    }, [isModalOpenAlt, inViewMode])
   

    // Handle event
    const eventHandler = ()=>{
        setIsModalOpenAlt(false)
        // Reset the caller component's state for toggling modal (if any)
        resetModalState()        
    }

    



    return(
        isModalOpenAlt ?

        createPortal(
            <>
                <StyledOverlay data-modal='close' onClick={eventHandler}/>
                {
                    typePlain ? 
                        <TypePlainModal>
                            <span 
                                title='close'
                                data-modal='close' 
                                onClick={eventHandler}
                                className='close'>&times;</span>
                            {children}
                        </TypePlainModal>
                    : 
                        <StyledModal ref={modalRef} inViewMode={inViewMode} adjustHeight={adjustHeight}>
                            <div className='relative grid apart modal-head'>
                                <h3>{ title }</h3>
                            </div>
                            <div className='modal-body'>
                                { children }
                            </div>
                            <div data-modal='close' onClick={eventHandler} className='modal-foot'>
                                <span  className='link close'>Close</span>
                            </div>
                        </StyledModal>
                    }
                }
            </>
            ,
            modalRoot
        )
        : null
    )
}


export default Modal