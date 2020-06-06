import React from 'react'
import styled from 'styled-components';
import Photo from '../../widget/photo/photo';
import randID from '../../../utilities/randID';
// import parseTitle from '../../../utilities/parseTitle';


const StyledRelated = styled.section`
    
    z-index: 0
    &::-webkit-scrollbar{
        width: 8px;
    }
    & .related-head{
        margin-bottom: 10px;
    }
    & .related-head span{
        white-space: nowrap;
    }
    & .related-content .photo{
        max-width: 280px !important;
    }
    & .related-content .photo .photo-head {
        padding: 0px 8px;
    }
    & .related-content .photo .material-icons{
        font-size: 20px;
        margin: 0px;
    }
    & .related-content .photo .author p{
        font-size: 12px;
    }

    @media(max-width:600px){
        position: relative;
        right: 0px;
        top: 0px;
        width: 100%;
        overflow-y: auto;
        max-height: 100%;
        z-index: 0

        & .related-head{
            margin: 50px 0px 20px 0px;
        }
        & .related-content .photo{
            max-width: 100% !important;
            margin-bottom: 25px !important;
        }
        & .related-content .photo .photo-head {
            padding: 10px ;
        }
        & .related-content .photo .material-icons{
            font-size: 30px;
            margin: 0px;
        }
        & .related-content .photo .author p{
            font-size: 16px;
        }
    }
` 

const Related = (props)=>{
    const { withIntro, data } = props
    const validateIfData = data ? true : false 

    const styles = {
        position: "fixed",
        right: "10px",
        top: "133px",
        width: "55%",
        overflowY: "scroll",
        maxHeight: "78vh"
    }


    return(
        <React.Fragment>
            {
                validateIfData &&
                <StyledRelated style={props.fixed && styles}>
                    <div className="related-head">
                        {
                            withIntro &&
                            <div className="no-wrap align-c grid">
                                <span className="black-t">Related Photos</span>
                                <div className='divider'></div>
                            </div>
                        }
                    </div>
                   <div className="related-content">
                       {
                            data.map( (photo, index) =>{
                                // const { url } = photo
                                // const title = parseTitle(url).replace(term, `<b>${term}</b>`)
                                return(
                                    // <li style={styless}>{title}</li>
                                    <Photo data={photo} index={index} key={randID()}/>
                                )
                            })
                       }
                   </div>
                </StyledRelated>
            }
        </React.Fragment>
    )
}

export default Related