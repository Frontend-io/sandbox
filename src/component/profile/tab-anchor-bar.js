import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';


const StyledAnchorTabBar = styled.div`
    border-bottom: 1.2px solid #eee;
    margin-top: 30px;
    padding: 0px 10px;

    & ul.list .tab-anchor{
        margin-right: 20px;
        padding-bottom: 15px;
        outline: none;
    }
    & ul.list .tab-anchor.current,
    & ul.list .tab-anchor.current .active{
        font-weight: 600;
    }
    & ul.list .position{
        content: '';
        width: 100px;
        height: 3px;
        border-radius: 50px;
        background: var(--primary-color);
        bottom: -6px;
        position: absolute;
        transition: .3s;
        transition-delay: .1s;
    }

    @media(max-width: 600px){
        & ul.list .tab-anchor{
            font-size: 14px;
            margin-right: 10px;
        }
    }
    @media(max-width: 350px){
        & ul.list .tab-anchor{
            font-size: 12px;
            margin-right: 8px;
        }
    }
`

const TabAnchorBar = ({ tabPosition, handleEvent, tab, setTabPosition })=>{

    const tabAnchors = [
        { title: 'Photos | 45k'},
        { title: 'Collection' },
        { title: 'Likes' },
        { title: 'About' }
    ]
    const styles = {
        locatePoint: {
            transform: `translateX(${tabPosition.loci - 11}px)` ,
            width: `${tabPosition.span + 8}px`
        }
    }

    // Load tab from hash
    const anchorRef = useRef(null)
    useEffect(()=>{
        const anchorRefCurrentChild = anchorRef.current.children[tab]
        tab && setTabPosition({
            loci: anchorRefCurrentChild.offsetLeft,
            span: anchorRefCurrentChild.clientWidth
        })
    },[setTabPosition, tab])



    

    return(
        <StyledAnchorTabBar className='tab-bar'>
            <div className='container'>
                <ul ref={anchorRef} className='relative no-margin no-padding grid list'>
                    {
                        tabAnchors.map( ( anchor, index )=>{
                            return(
                            <NavLink 
                                onClick={handleEvent} 
                                tabIndex={index} 
                                className={` ${tab === index ? 'current' : ''} tab-anchor`} 
                                to='#'
                                key = {index}>
                                {anchor.title}
                            </NavLink>
                            )
                        })
                    }
                    <span style={styles.locatePoint} className='absolute position'></span>
                </ul>
            </div>
        </StyledAnchorTabBar>
    )
}

export default TabAnchorBar