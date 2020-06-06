import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import randID from '../../utilities/randID';

const StyleAbout = styled.div`
    & .about-tab{
        padding: 10px 20px;
        margin-top: 15px;
        box-shadow: 0px 5px 5px rgba(0,0,0,.05);
    }  
    & .no-shadow.about-tab{
        box-shadow: none
    }
    & .about-tab > * {
        padding: 15px 20px !important;
    }
    & .about-tab > *{
        margin: 0px;
    }
    & .about-tab h3{
        border-bottom: 1px solid #eee;
    }
    & .about-tab p {
        line-height: 1.5;
        font-size: 16px
    }
    & .about-tab .interests .interest{
        font-size: 16px;
        background: #fafafa;
        border-radius: 3px;
        padding: 5px 10px;
        margin-left: 0px;
    }
    @media(max-width: 600px){
        font-size: 14px;
        & .about-tab button{
            font-size: 14px;
            padding: 5px 8px !important;
        }
    }
`

const About = (props)=>{
    const { info, interests, social,  } = props.userInfo || {}

   

    
    return(
        <StyleAbout className='tab-content about-tab'>
            {
                props.userInfo && 

                <div className=' container'>
                     <div className='no-shadow about-tab'>
                        <h3>Description</h3>
                        <p>{info}</p>
                    </div>

                <div className='about-tab'>
                    <h3>Interests</h3>
                    <ul className='no-padding grid interests'>
                        {
                            interests.map((item)=>{
                                return (
                                    <NavLink key={randID()} className=' cap interest' to={`photos/${item}`}>
                                        {item}
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='about-tab'>
                    <h3>Social</h3>
                    <ul className='no-padding'>
                        {
                            social.map( item =>{
                                return(
                                    Object.entries(item).map(element =>{
                                        const [ site, handle ] = element
                                        return(
                                            <li className='grid social-link' key={randID()}> 
                                                <span className='cap'>{site} -</span> 
                                               {
                                                   handle ?  <a className='bold-text-1' href={`https://${site}.com/${handle}`}>{ handle }</a> : <p>Not Available</p>
                                               }
                                            </li>
                                        )
                                    })
                                )
                            })
                        }
                    </ul>
                </div>
           </div>
            }
        </StyleAbout>
    )
}


export default About