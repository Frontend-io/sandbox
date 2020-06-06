import React from 'react';
import { withRouter } from "react-router-dom"

import styled from 'styled-components'
import Logo from '../../widget/logo/logo';
import CompactNav from './header-widgets/navLinks';
import SearchForm from '../../widget/search-form/search-form';



const StyledHeader = styled.header`
    position: relative;
    top: 0;
    z-index: 99999;
    background: #fff;
    padding: 5px 10px;
    height: 60px;
    & .form-fix{
        font-size: 16px;
    }

    & .logo{
        flex: .5;
    }
    
    @media(max-width: 768px){
        padding: 0px ;
    }
`


const Header = ({isHome})=>{

    
    
    
    const headerStyle = {
        background: isHome && 'transparent',
        position: isHome ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: "100%",
        borderBottom: isHome ? '1px solid tranparent' : '1px solid #eee'
    }


    return(
        <>
            <StyledHeader className='no-wrap grid align-c centered' style={headerStyle}>
                <Logo compact />
                <SearchForm 
                        autofocus='false'
                        placeholder="Search for anything - photos, users" 
                    />
                <CompactNav isHome={isHome}/>           
            </StyledHeader>
        </>
    )
}

export default withRouter(Header)