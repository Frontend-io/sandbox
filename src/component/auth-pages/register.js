import React, { useState } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { AuthWrapper, StyledAuthForm, AuthBackgroundstyles } from './login';
import MessageAlert from '../widget/messages-alert/message';



const RegWrapper = styled(AuthWrapper)``
const RegAuthForm = styled(StyledAuthForm)`
    padding-top: 10px;
    & .form-head,
    & .form-foot{
        padding-top: 5px;
    }
`

const RegistrationForm = ({eventHandler, state, })=>{
    const { 
        firstName, 
        lastName, 
        email, 
        password, 
        passwordCheck, 
        isError, 
        errorMessage 
    } = state || {}




    return(
        <RegAuthForm className='register'>
            <form onSubmit={eventHandler}>
                <div className='centered-text form-head'>
                    <h2 className='auth-title'>Join Pixare</h2>
                </div>
                <div className='no-padding divider'></div>
               <div className='body'>
                   {    isError &&
                        <MessageAlert icon='info' type='error' title='Account not found' message='Email and Password do not match' />
                   }
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ firstName }
                            autoComplete='off' 
                            type='text' 
                            name='firstName' 
                            placeholder='First Name' 
                            className='form-fix' 
                            required
                        />
                    </div>
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ lastName }
                            autoComplete='off' 
                            type='text' 
                            name='lastName' 
                            placeholder='Last Name' 
                            className='form-fix' 
                            required
                        />
                    </div>
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ email }
                            autoComplete='off' 
                            type='email' 
                            name='email' 
                            placeholder='Email address' 
                            className='form-fix' 
                            required
                        />
                    </div>
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ password }
                            autoComplete='off' 
                            type='password' 
                            name='password' 
                            placeholder='Password' 
                            className='form-fix' 
                            required
                        />
                    </div>
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ passwordCheck }
                            autoComplete='off' 
                            type='password' 
                            name='passwordCheck' 
                            placeholder='Re-enter Password' 
                            className='form-fix' 
                            required
                        />
                       {
                           isError &&
                            <small className='red-t error-check'>
                                {errorMessage}
                            </small>
                       }
                    </div>
                    <button type="submit" className='blue auth-btn full-width'>Create Account</button>
               </div>
                <div className='no-padding divider'></div>
                <div className='centered-text form-foot'>
                    <p>Already a member?</p>
                    <NavLink className='blue-t' to='/login'>Login</NavLink>
                </div>
            </form>
        </RegAuthForm>
    )
}

const Register = ()=>{

    const [ registerDetail, setRegisterDetail ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordCheck: '',
        isError: false,
        errorMessage: ''
    })
    const eventHandler = (e)=>{
        e.preventDefault()
        const { value, name } = e.target
        setRegisterDetail({
            ...registerDetail,
            [name] : value
        })
        if(e.type === 'submit'){
            // MAKE SURE PASSWORDS MATCH
            if( registerDetail.passwordCheck !== registerDetail.password ){
                setRegisterDetail({
                    ...registerDetail,
                    isError: true,
                    errorMessage: 'Passwords do not match!'
                })
            }else{
                alert(registerDetail.email)
            }
        }
    }


    return(
        <>
            <RegWrapper style={AuthBackgroundstyles} className="join-wrapper">
                <div className="grid align-c padded-20 demo">
                    <h1>Best place to find awesome collections of stock photos from around Africa</h1>
                    <p>Join over <b>20,000</b> creative African photographer and share memories! </p>
                </div>
                <RegistrationForm  eventHandler={eventHandler} state={registerDetail} />
            </RegWrapper>
        </>
    )
}

export default Register