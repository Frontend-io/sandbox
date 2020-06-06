import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledMessageAlert = styled.div``


const MessageAlert = (props)=>{
    const { icon, type, message, title, dismissable } = props

    const [ dismiss, setDismiss ] = useState(false)
    const handleDismiss = ()=>{
        if(dismissable)
        setDismiss(true)
    }

    useEffect(()=>{
        setDismiss(false)
    }, [])

    return(
        <>
            {
                !dismiss && 
                <StyledMessageAlert className={`${type} ${ dismissable? 'dismissable' : '' } message` }>
                   {
                       dismissable &&
                       <i onClick={handleDismiss} className='material-icons close'>close</i>
                   }
                    <i className='material-icons'>{icon}</i>
                    <div className='des'>
                        <h5>{title}</h5>
                        <p>{message}</p>
                    </div>
                </StyledMessageAlert>
            }
        </>
    )
}

export default MessageAlert