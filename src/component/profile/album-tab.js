import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ReactComponent as ImageSvg } from '../../assets/picture.svg'
import styled from 'styled-components';

import randID from '../../utilities/randID'
import generateCollectionCoverImage from '../../utilities/generateCollectionCoverImage';
import shortenText from '../../utilities/shortenText';
import EmptyContent from '../widget/empty-content/empty-content';
import NewAlbumButton from '../widget/createNewAlbumButton/createNewAlbumButton';
import Loader from '../widget/loader/loader';




const StyledAlbumWrapper = styled.div`
    
    @media(max-width: 600px){
        & .albums{
            align-items: center;
            flex-direction: column
        }
    }
    
`
const StyledAlbum = styled.div`
    min-width: 250px;
    max-width: 300px;
    margin: 5px;
    overflow: hidden;

    & .private-flag{
        left: 10px;
        top: 50px;
        height: 30px;
        width: 30px;
        background: rgba(0,0,0,.5);
        border-radius: 100%;
        box-sizing: border-box;
        padding: 8px 0px 0px 1px;
    };
    & .private-flag i {
        font-size: 18px;
        color: #aaa
    }

    & .album-head{
        align-items: center
    }
    
    & .album-head .album-title{
        margin-bottom: 8px;
        text-transform: capitalize;
        font-size: clamp( 14px, 50vw, 18px)
    }
    & .album-head .count{
        font-size: 12px;
    }
    & .album-head .count svg{
        fill: dimgrey
    }
    & .album-grid{
        overflow: hidden;
        height: 200px;
        border-radius: 5px; 
    }
    & .tall-img{
        box-sizing: border-box
    }
    & .img{
        margin: 0px !important;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: #f2f2f2;
    }
    & .img img{
        margin: 0px;
        min-width: 100%;
        height: 100%;
        object-fit: cover;
    }
    & .img.rec-img{
        border-left: 1.2px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    & .img.rec-img img:nth-child(2){
        border-top: 1.2px solid #ddd;
    }
    & .album-foot.tags{
        margin-top: 5px;
    }
    & .album-foot.tags .tag{
        font-size: 12px;
        background: #fafafa;
        border-radius: 3px;
        padding: 5px 10px;        
    }

    @media(max-width: 630px){
        width: 100%; 
        flex: 1;
        margin: 15px auto !important;
        max-width: 100%;
        & .album-grid{
            height: 230px;
            border-radius: 0px;
        }
        & .album-head,
        .album-foot{
            padding: 0px 8px;
        }
    }

`



const AlbumList = (props)=>{

    const { 
        album: { 
            id,
            title, 
            isPrivate, 
            photos,
            tags,
        } = {}, 
    } = props

    // Collection cover image manipulation
    const { 
        length, 
        tall, 
        extraOne, 
        extraTwo , 
        extrasHeight 
    } = generateCollectionCoverImage(photos) || {}

    const albumCoverBackup = {
        background: length ? null : '#f2f2f2'
    }

    // Collection link and title
    const collectionLink = `/collections/${id}/${title.split(' ').join('_').toLocaleLowerCase()}`
    const useTitle = shortenText(title,4,'...')
    
    



    return(
        <StyledAlbum className='relative tab-content album'>
            <NavLink to={collectionLink}>
                {
                    isPrivate &&
                    <span className='absolute private-flag'>
                        <i className='material-icons'>lock</i>
                    </span>
                }
                <div className='grid apart album-head'>
                    <h3 className='album-title'>{useTitle}</h3>
                    <small className='count grid align-c '>
                        <p>{length}</p> 
                        <ImageSvg />
                    </small>
                </div>
                <div style={albumCoverBackup} className='no-wrap equal grid album-grid'>
                    {
                        length ?
                            <div className='img tall-img'>
                                <img src={tall} alt={'cover'} />
                            </div>
                        : null
                    }

                    {/* Show more photos if there are more */}
                    {
                        length >= 2 ? 
                        <div className='img rec-img'>
                            <img src={extraOne} alt={'cover'} style={extrasHeight} />
                            {
                                length >= 3 && 
                                <img src={extraTwo} alt={'cover'} style={extrasHeight} />
                            }
                        </div>
                        : null
                    }
                </div>
            </NavLink>
            <div className='grid album-foot tags'>
                {
                    tags && 
                    tags.map( tag => {
                        return(
                            <NavLink
                                className='tag' 
                                to={`images/${tag}`}
                                key={randID()}
                                >{tag}
                            </NavLink>
                        )
                    })
                }
            </div>
        </StyledAlbum>
    )
}


const Album = (props)=>{
    const { 
        userInfo: { 
            userName 
        } = {}, 
        state: { 
            collections, 
            loading
        } = {} 
    } = props


    return(
        <StyledAlbumWrapper className='photo-album'>
            {
                collections && !loading ? 
                <div className='gap-10 grid albums'>
                    <NewAlbumButton />
                    {
                        collections.map(album =>{
                            return(
                                <AlbumList userName={userName} album={album} key={randID()}/>
                            )
                        })
                    }
                </div>
                :
                !loading && 
                <EmptyContent title='You have not created any collection'>
                    <svg 
                        className='resize'
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24">
                        <path d="M4 17.162l-2 .838v-12.972l12-5.028v2.507l-10 4.19v10.465zm16-8.156v8.635l-8 3.352v-8.635l8-3.352zm2-3.006l-12 5.028v12.972l12-5.028v-12.972zm-14 3.697l10-4.19v-2.507l-12 5.028v12.972l2-.838v-10.465z"/>
                    </svg>
                </EmptyContent>
            }
            {
                loading &&
                <Loader message='Loading your collections...' />
            }
        </StyledAlbumWrapper>
    )
}










const mapStateToProps = (state) => ({
    state: { ...state.collection}
})
const mapDispatchToProps = (dispatch)=>{
    return{
        dispatch: action =>{dispatch(action)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Album)