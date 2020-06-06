import React from 'react'
import getAttribute from '../../../utilities/getAttribute'
import randID from '../../../utilities/randID'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { clearMessage } from '../../../container/redux/actions/alert-actions/alert-action-creator';

const StyledAlert = styled.div`    
& .alert{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: columns;
    padding: 20px;
    color: #fff;
    background: var(--secondary-color);
    border-radius: 3px;
    min-width: 50%;
    z-index: 9999999;
    animation: swing .3s ease-out;
    transition: .5s;
    & .close {
        position: absolute;
        top: -0px;
        right: 5px;
        font-size: 30px;
        color: #aaa;
    }
    & .close:hover{
        color: #fff
    }

    @media(max-width: 768px){
        min-width: 80%;
    }
}
`


const Alerts = (props)=>{
    const { dispatch, state: { message } = {} } = props

    const cleanMessage = (e)=>{
        const index = getAttribute(e.target, 'index')
        dispatch(clearMessage(index))              
    }


    return(
        ReactDOM.createPortal(
            <>
                {
                    message ? 
                    <StyledAlert>
                        {
                            message.map( ( message, index) =>{
                                return(
                                    <div style={{bottom: index * 70 + 20 }} className='alert' key={randID()}>
                                        <span data-index={index} onClick={cleanMessage} className='link close'>&times;</span> 
                                        {message}
                                    </div>
                                )
                            })
                        }
                    </StyledAlert>
                    : null
                }
            </>,
            document.getElementById('alertsPortal')
        )    
    )
}




const mapStateToProps = (state) => ({
    state: {...state.alerts}
})

const mapDispatchToProps = (dispatch)=>{
    return{
        dispatch: action =>{dispatch(action)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Alerts)