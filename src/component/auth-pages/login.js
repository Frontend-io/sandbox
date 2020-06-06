import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import MessageAlert from '../widget/messages-alert/message';

export const AuthWrapper = styled.div`
    min-height: 93vh;
    display: flex;
    flex-wrap: nowrap;
    & > *{
        flex: 1
    }
    & .demo{
        background: #fff;
        color: var(--secondary-color)
    }
    & .form-foot {
        letter-spacing: 1.2px;
        font-size: 16px
    }
    & .form-foot a{
        margin-top: 10px;
    }
        
    @media(max-width: 768px){
        & .demo h1{
            font-size: 1.5em
        }
        & .login form h2{
            font-size: 1.2em
        }
        & .login {
            flex: 1.5;
        }
        & .demo {
            min-height: 30vh
        }
        
    }

        
    @media(max-width: 600px){
        flex-direction: column;      
        & .login{
            padding-top: 0px;
        }
        & .demo {
            background: transparent;
            color: #fff;
            max-height: fit-content;
            min-height: 0px;
            padding: 10px 10px 15px 10px !important
        }
        & .demo p{
            font-size: 14px;
            margin: 0px;
            text-shadow: var( --soft-shadow);
        }

        & .demo h1{
            font-size: 1.2em;
            text-shadow: var( --soft-shadow)
        }
        
    }
`
export const StyledAuthForm = styled.div`
    min-width: 30%;
    max-width: 450px;
    background: #fff;
    padding: 20px 0px;

    & form > div{
        padding: 20px;
    }
    & form .divider.mt-30{
        margin-top: 60px;
    }
    & form .auth-btn{
        background: var(--primary-color);
        font-size: 18px;
        font-weight: 600;
        padding: 20px;
        margin-top: 20px;
    }
    & form .auth-btn:disabled{
        background: #eee;
        cursor: not-allowed
    }
    @media(max-width: 600px){
        max-width: 100%
    }

` 


export const desktopBackground = "url(https://images.pexels.com/photos/4045428/pexels-photo-4045428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)"
const mobileBackground =  "linear-gradient(to right, rgba(0, 0, 80, .3), rgba(100, 0, 0, .5)),url(https://images.pexels.com/photos/4045428/pexels-photo-4045428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)"

export const AuthBackgroundstyles = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    background: window.outerWidth > 600 ? desktopBackground : mobileBackground
}



const LoginForm = ({eventHandler, state, })=>{
    const { email, password, isError } = state || {}


    return(
        <StyledAuthForm className='login'>
            <form onSubmit={eventHandler}>
                <div className='centered-text form-head'>
                    <h2 className='auth-title'>Continue to your Account</h2>
                </div>
                <div className='no-padding divider'></div>
               <div className='body'>
                   {    isError &&
                        <MessageAlert icon='info' type='error' title='Account not found' message='Email and Password do not match' />
                   }
                    <div className='field'>
                        <input 
                            onChange={ eventHandler } 
                            value={ email }
                            autoComplete='off' 
                            type='email' name='email' 
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
                    <button type="submit" className='blue auth-btn full-width'>Login</button>
               </div>
                <div className='no-padding divider mt-30'></div>
                <div className='centered-text form-foot'>
                    <p>Haven't joined yet?</p>
                    <NavLink className='blue-t' to='/join'>Register</NavLink>
                </div>
            </form>
        </StyledAuthForm>
    )
}

const Login = ()=>{

    const [ loginDetail, setLoginDetail ] = useState({
        email: '',
        password: '',
        isError: false
    })
    const eventHandler = (e)=>{
        e.preventDefault()
        const { value, name } = e.target
        setLoginDetail({
            ...loginDetail,
            [name] : value
        })
        if(e.type === 'submit'){
            alert(loginDetail.email)
        }
    }
   
    return(
        <>
            <AuthWrapper style={AuthBackgroundstyles} className="login-wrapper">
                <div className="grid align-c padded-20 demo">
                    <h1>Best place to find awesome collections of stock photos from around Africa</h1>
                    <p>Join over <b>20,000</b> creative African photographer and share memories! </p>
                </div>
                <LoginForm  eventHandler={eventHandler} state={loginDetail} />
            </AuthWrapper>
        </>
    )
}

export default Login