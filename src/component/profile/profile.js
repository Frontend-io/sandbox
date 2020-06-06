import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import Album from './album-tab';
import TabAnchorBar from './tab-anchor-bar';
import About from './about-tab';
import ProfileHead from './profile-head';
import PhotoTab from './photo-tab';
import Likes from './likes-tab';


export const dataLoop = [12,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,2312,23,44,5,6,7,767,45,34,2,23]
const userAbout = {
    name: 'Mush Abello',
    avatar: 'https://images.pexels.com/photos/3105920/pexels-photo-3105920.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    info: ' I am fun, love photography and eveything that comes through the lens. I am 18 and i have a deep passion for taking and sharing fre pictures around Africa ',
    userName: '@MusaAbel',
    location: 'Lagos, NG',
    followers: 2000,
    interests: [
        'swimming', 'taking pictures', 'singing', 'camping', ' travelling', 'meeting people'
    ],
    contact: [
        {
            email: 'iyobosajefferson2@gmail.com',
            phone: '+23481283342',
            lockPhone: true
        }
    ],
    social: [
        {
            twitter: '@frontend_io',
            facebook: '',
            instagram: '@frontend_io'
        }
    ]
} 

const StyledProfile = styled.div`
    margin-bottom: 60px;
    background: #fcfcfc;
    & .head{
        position: relative;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee
    }
    & .profile-content .photos{
        columns: 3em ;
        column-gap: 10px;
        column-count: 4;
    }
    & .profile-content .photos .photo{
        word-break: keep-all;
    }

    @media(max-width: 600px){
        & .profile-content{
            padding: 20px 0px !important
        }
    }
    
`


const Profile = (props)=>{

    const { location: { hash } } = props
    const loadTabFromHash = (hash)=>{
        let id = hash.split('#')[1]
        switch(id){
            case "photos" :
                return 0
            case "collection" :
                return 1
            case "likes" :
                return 2
            case "about" :
                return 3
            default:
                return null
        }
    }


  

    // SET TAB CURRENT TAB
    const [ tab, setTab ] = useState(loadTabFromHash(hash))
    let offset 
    let tabPositionSpan; 
    const [ tabPosition, setTabPosition ] = useState({
        loci: offset,
        tabPositionSpan
    })


    // Load tab
    const handleEvent = (e)=>{
        const { tabIndex, offsetLeft, clientWidth } = e.target

        setTab(tabIndex)
        setTabPosition({
            loci: offsetLeft,
            span: clientWidth
        })
    }

    // SET A DEFAULT POSITION ONLOAD
    useEffect(()=>{
        !hash && setTabPosition({
            loci: 1,
        })
        !hash && setTab(0)
    }, [hash])

    // LOAD USER DATA
    const [ userInfo, setUserInfo ] = useState([])
    useState(()=>{
        setUserInfo(userAbout)
    },[])       

 
    return(
        <>
            <StyledProfile className='profile-wrapper'>
                <div className="white head">
                    <div className='in-container'>
                        <ProfileHead userInfo={userInfo} />
                    </div>
                </div>
                <TabAnchorBar 
                    tab={tab} 
                    tabPosition={tabPosition} 
                    handleEvent={handleEvent}
                    setTabPosition={setTabPosition}
                />
                <div className='white padded-20 profile-content'>
                    <div className='bezless container'>
                       {
                           tab === 3 ?
                               <About userInfo={userInfo} />
                            : 
                            tab === 2 ? 
                                <Likes />  
                            :
                                tab === 1 ?
                                    <Album userInfo={userInfo}/>
                                :
                                // Load PhotoTab by default
                                <PhotoTab />
                       }
                    </div>
                </div>
            </StyledProfile>
        </>
    )
}


export default Profile
