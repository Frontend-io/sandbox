import { createStore, applyMiddleware, combineReducers } from "redux"
import Logger  from "redux-logger"
import  thunk  from 'redux-thunk'

import photoReducer from "../reducers/photo.reducer";
import SearchReducer from "../reducers/search.reducer";
import UploadReducer from "../reducers/upload.reducer";
import SystemReducer from "../reducers/system.reducer";
import collectionsReducer from "../reducers/collections.reducer";
import AlertReducer from "../reducers/alert.reducer";
import likesReducer from "../reducers/likes.reducer";
import ViewReducer from "../reducers/photo-view-reducer";



const rootReducer = combineReducers({
    photo: photoReducer,
    search: SearchReducer,
    upload: UploadReducer,
    system: SystemReducer,
    collection: collectionsReducer,
    like: likesReducer,
    alerts: AlertReducer,
    view: ViewReducer 
})
const store = createStore( rootReducer , applyMiddleware(
    Logger, thunk
))

export default store