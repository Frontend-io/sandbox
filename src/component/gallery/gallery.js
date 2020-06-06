import React from 'react';
import styled from 'styled-components'
import Dropdown from '../widget/dropdown/dropdown';
import Photo from '../widget/photo/photo';
import Void from '../widget/void-content/void';
import randID from '../../utilities/randID';
import Loader from '../widget/loader/loader';

const TopBar = styled.div`
    border-bottom: 1px solid #eee;
    color: #555;
    background: #fff;
    fontSize: 1.5em;
    transition: .3s;
    z-index: 9999;
    & span{
        text-transform: capitalize;
        color: #000;
    }

    @media(max-width: 768px){
        justify-content: space-between !important;
        padding: 10px 20px
    }
` 

const StyledGallery = styled.div`
    position: relative;
`
 const Wrapper = styled.div`
    column-count: 3;
    column-gap: 20px;
    column-width: 200;
    padding: 20px 0px;

        
    @media(max-width: 768px){
        column-count: 2;
    }
    @media(max-width: 600px){
        column-count: 1;
        display: flex;
        flex-direction: column;
        & .photo{
            max-width: 100% !important;
        }
    }

 `


const Topbar = (props)=>{

    const { state: { photo : {category} } } = props
    const categories = [
        { title: 'Trending', value: 'trending' },
        { title: 'Nature', value: 'nature' },
        { title: 'Education', value: 'education' },
        { title: 'Health', value: 'health' },
        { title: 'AI', value: 'artificail intelligence' },
        { title: 'Football', value: 'football' },
        { title: 'Wild', value: 'wild' },
        { title: 'Science', value: 'science' },
        { title: 'Sport', value: 'sport' },
        { title: 'Adult', value: 'adult' },
        { title: 'Animations', value: 'animals' },
        { title: 'Military', value: 'military' },
        { title: 'Defense', value: 'defence' },
        { title: 'Religion', value: 'religion' },
        { title: 'Music', value: 'music' },
        { title: 'Business', value: 'business' },
        
    ]



    return(
        <TopBar className="padded-10 grid grey-t around align-c topbar">
            <span>{category} photos</span>
            <Dropdown {...props} type="list" data={categories} />
        </TopBar>
    )
}


const Gallery = (props)=>{
   const { state: { photo: { loading, photos, message }, search: {isSearching} } } = props
      
   
    return(
        <StyledGallery>
            {
                    photos && loading === false && !isSearching &&
                    <>
                        <Topbar {...props}/>
                        <div className="bezless container">
                            <Wrapper style={{ filter: isSearching ? 'blur(3px)' : null}}>
                                {
                                    photos.map( (photo, index) =>{
                                        return(
                                            <Photo index={index} key={randID()}/>
                                        )
                                    })
                                }
                            </Wrapper>
                        </div>   
                    </>
            }
            {
                loading === true && <Loader black='true' />
            }
            {
                !photos && loading === false && 
                <Void 
                    adjustposition
                    title={message} 
                    description="We couldn't load your content, please check your network connection" />
            }
                
        </StyledGallery>
    )
    
}


export default Gallery