import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { Logo } from '../../widget/logo/logo';


const StyledFooter = styled.footer`
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    margin-top: 350px;
    &.halve{
        width: 77% !important;
        float: right; 
    }
    
    
    @media(max-width: 768px){
        &.halve{
            width: 100% !important;
            float: none; 
        }
    }
`

const Footer = ( props )=>{
    const { location:{pathname}, state: {photo : {photos }} } = props
    const route = pathname.split('/')[1]
    const style={
       themed: {
        borderTop: "1px solid #eee",
        padding: "20px",
        zIndex: 999,
        background: "var(--darker-blue)",
        color: "#fff",
        minHeight: "150px",
        marginTop : photos !== null ? '30px' : null,
       }
    }
    const extraClass = route === "collections" ? "halve" : ""
    const noFooterRoutes = [
        'pixare', 
        'upload', 
        'profile',
        '',
        'join',
        'login'
    ]

    


    return(
       <React.Fragment>
           {
               !noFooterRoutes.includes(route) &&
               <StyledFooter style={style.themed} className={`grid footer ${extraClass}`} >
                    <div>
                        <Logo />
                        <small>Powered by <b>Pexels</b></small> 
                    </div>
                </StyledFooter>
           }
       </React.Fragment>
    )
}



const mapStateToProps = state =>{
    return{
        state
    }
}
export default connect(mapStateToProps)(withRouter(Footer))