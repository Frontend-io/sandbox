// import React from 'react';
// import "./collection.css"
// import { connect } from 'react-redux'
// import Void from '../widget/void-content/void';
// import Related from '../widget/related-images/related-image';
// import { emptyFav, addFav } from '../../container/redux/actions/photo-action/photo-action-creator';
// import parseTitle from '../../utilities/parseTitle';

// const Collections = (props)=>{
//     const { dispatch, state: { photo: { message, favPhotos } } } = props
//     const  { photographer, url, src } = favPhotos[0] || {}
//     const {  portrait, original } = src || {}
//     const title = parseTitle(url) || ''
    
 
    
//     // Empty fav list
//     const clearFav = (e)=>{
//         e.target.innerText = 'Emptying Bucket...'

//         setTimeout(()=>{
//             dispatch(emptyFav())
//         }, 1000)
//     }
//     const handleEvent = (e)=>{
//         const name = e.target.getAttribute('data-type')
//         name === 'removeFav' && dispatch(addFav(favPhotos[0]))        
//     }
//     // DOWNLOADING IMAGES


    



//     return(
//         <React.Fragment>
//             {
//                 favPhotos ? 
//                 <React.Fragment>
//                     <div className="grid apart align-c -width content-head">
//                         <div className="">
//                             <h2>My Bucket</h2>
//                             <label className="red-t"> You currently have {favPhotos.length} pictures</label>
//                         </div>
//                         {
//                             favPhotos.length ?
//                             <button onClick={clearFav} className="red">
//                                 Empty Backet
//                             </button>
//                             : null                            
//                         }
//                     </div>
//                     <div className="collections">
//                         <div className="action-tab">
//                            {
//                                favPhotos.length ?
//                                <React.Fragment>
//                                    <div className="grey-t title">
//                                        <h4>Last added photo- </h4>
//                                         <label className='title-inner'>{title} by <b className='blue-t'>{photographer}</b> </label> 
//                                     </div>
//                                     <div className="specimen">
//                                         <img src={portrait} alt={portrait} />
//                                     </div>
//                                     <div className="action">
//                                         <button onClick={handleEvent} data-type='removeFav' className="full-width">Remove favourite</button>
//                                         <a href={original.toString()} download={title} > <button name='download' className="full-width">Download</button></a>
//                                     </div>
//                                </React.Fragment>
//                                : <p className='grey-t centered-text'>No recent photo</p>
//                            }
//                         </div>
//                         <div className={`collection-content ${favPhotos.length ? 'column' : ''}`}>
//                             {
//                                 favPhotos.length ? 
//                                 <Related data={favPhotos}/>
//                                 : <Void empty="true" />
//                             }
//                         </div>
//                     </div>
//                 </React.Fragment>
//                 :
//                 <Void error={message}/>
//             }
//         </React.Fragment>
//     )
// }


// const mapStateToProps = state =>{
//     return{
//         state
//     }
// }

// const mapDispatchToProps = dispatch =>{
//     return{
//         dispatch: (action)=>{
//             dispatch(action)
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Collections)