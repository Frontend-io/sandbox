import React from 'react';
import randID from '../../../utilities/randID'
import styled from 'styled-components'
import { Link } from "react-router-dom"


const StyledNavigation = styled.div`
    min-width: 250px;
    position: absolute;
    right: -5px;
    top: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 9999999;
    border-radius: 10px 0px 10px 10px;
    border-radius: var(--soft-shadow);
    transition: .5s;
    animation: meet .28s ;
    box-shadow: 0px 10px 30px rgba(0,0,0,.08);

    @keyframes meet {
        from{
            transform: scale(.2);
        }
        to{
            transform: scale(1.05);
        }
    }

    @media(min-width: 768px){
        right: 25px;
    }
`
const Nav = styled.nav`
    flex-direction: column;  
    background: #111;
    border-radius: 5px;
    width: 100%;
    color: #fff;
    padding-top: 20px;
    & button.green{
        margin-left: 5px !important
    }
   

    & > * {
        padding: 12px 20px 12px 30px;
    }    
    & a {
        display: flex;
        text-transform: capitalize;
    }
    & a i {
        margin: 0px 30px 0px 0px !important;
    }
    & > a * {
        color: #aaa;
    }
    & a:hover > * {
        color: #fff
    }
    & .quick-btn{
        border-top: 1px solid #555;
        padding: 10px 5px 0px 5px !important;
    }
    @media(max-width: 768px){
        &::after{
            left: 84%
        }
        &::after{
            content: "";
            position: absolute;
            height: 30px;
            width: 30px;
            background: #111111;
            top: -3px;
            left: 40%;
            transform: translateX(-50%);
            transform: rotate(45deg);
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            z-index: -1;
        }
    }
`


const Navigation = ({isOpen, closeNav})=>{

    
    const NavLinks = [
        // {title: 'Home', route: '', icon: 'home' },
        {title: 'Upload', route: 'upload', icon: 'backup' },
        {title: 'Photos', route: 'profile/', icon: 'image' },
        {title: 'collections', route: 'profile/#collection', icon: 'list' },
        {title: 'profile', route: 'profile/#about', icon: 'badge' },
        // {title: 'Search', route: 'search', icon: 'search' },
        {title: 'Sign In', route: 'login', icon: 'power' },
        {title: 'Register', route: 'join', icon: 'edit' },
        {title: 'Sign out', route: 'signout', icon: 'power_off' },
    ]




    
    return(
        <React.Fragment>
            {
                isOpen &&
                <StyledNavigation>
                    <Nav>
                        {
                            NavLinks.map(link=>{
                                const {  title, route } = link
                                return(
                                    <Link onClick={closeNav} to={`/${route}`} key={randID()}>
                                        <span>{title}</span>
                                    </Link>
                                )
                            })
                        }   
                        <ul  className='grid equal no-padding quick-btn'>
                            <Link to='/login'>
                                <button onClick={closeNav} className='full-width green'>Login</button>
                            </Link>
                            <Link to='/join'>
                                <button onClick={closeNav} className='full-width red'>Join</button>
                            </Link>
                        </ul> 
                    </Nav>
                </StyledNavigation>
            }
        </React.Fragment>
    )
}


export default Navigation