import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';

import { StyledResponsivePhotoTab } from '../profile/photo-tab';
import TopBar from '../widget/topbar/top-bar';
import getCollectionInfo from '../../utilities/getCollectionInfo';
import Loader from '../widget/loader/loader';
import Photo from '../widget/photo/photo';
import randID from '../../utilities/randID';
import Void from '../widget/void-content/void';


const StyledCollectionsView = styled.div`
    position: relative;
    & .collection-content {
        margin-top: -200px;
        min-height: 50vh;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 5px 5px 0px 0px;
        background: #fff;
    }
    & .collection-content .void-wrapper{
        z-index: 1;
        width: 100%;
    }
    @media(max-width: 768px){
        & .collection-content{
            padding: 10px;
        }
    }
    
` 
const Slant = styled.div`
        clip-path: polygon(0 100%, 100% 100% , 100% 0vh, 100% -90vh);
        transition: .4s;
        overflow: visible;
        background: white;
        height: 200px;
        top: 300px;
        left: 0px;
        width: 100%;
        position: absolute;

    @media(max-width: 768px){
        clip-path: polygon(0 100%, 100% 100% , 100% 0vh, 0% 20vh);
        top: 250px;
    }
` 


const CollectionsView = props => {

    const { 
        match: { 
            params: { 
                id : imageId
            } = {} 
        } = {}, 
        state: { 
            collections 
        } 
    } = props


    const collectionName = imageId.split('_').join(' ')
    const collectionInfo = getCollectionInfo(collectionName, collections) 
    const { id, description, photos, isPrivate } = collectionInfo || {}

    const [ searching, setSearching ] = useState(true)
    useEffect(()=>{
        photos && setSearching(false)
    }, [photos])

    // Handle erros if match is not found
    const [ foundMatch, setFoundMatch ] = useState(false)
    useEffect(()=>{
        if(collectionInfo){
            setFoundMatch(true)
        }else{
            setFoundMatch(false)
            setSearching(false)
        }
    }, [collectionInfo])


    const lengthOfCollection = photos ? photos.length : null
    const title = `${collectionName} | ${lengthOfCollection} ${lengthOfCollection > 1 ? 'photos' : 'photo'}`
    const coverImage = lengthOfCollection > 1 ? photos[ lengthOfCollection - 1].url : null 
    const privateFlag = isPrivate ?  
    {
        icon: 'lock', 
        des: 'Private Collection'
    } : 
    {
        icon: 'public', 
        des: 'Public Collection'
    }

    // Fix slant shape on smaller screens with more contents
    const responsiveSlant = {
        top: title.length > 50 ? '250px' : '300px' 
    }

    

    return(
        <>
            {
                !searching && foundMatch ? 
                <StyledCollectionsView>
                    <TopBar 
                        title={title} 
                        description={description} 
                        cover={coverImage} 
                        customHeight='400px'
                        extra={privateFlag}
                    />
                    <Slant style={responsiveSlant} className='slant-wrapper'></Slant>
                        <div className='container'>
                                {
                                    lengthOfCollection ? 
                                    <StyledResponsivePhotoTab className='collection-content'>
                                        {
                                            photos.map( i =>{
                                                return <Photo payload={id} key={randID()} />
                                            }) 
                                        }
                                    </StyledResponsivePhotoTab>
                                    : 
                                    <div className='void-wrapper'>
                                        <Void title="You have not added any photos to this collection" />
                                    </div>
                                }
                        </div>
                </StyledCollectionsView>
                : 
                searching ?  <Loader message="Loading your album, please wait..." /> 
                : 
                <>
                    <Void 
                        adjustposition
                        title={`No match found for '${collectionName}'`} 
                        description="Please check your spelling or URL and try again"
                    /> 
                </> 
            }
        </>
    )
}



const mapStateToProps = (state) => ({
    state: state.collection
})
const mapDispatchToProps = (dispatch)=>{
    return{
        dispatch: action =>{dispatch(action)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsView)