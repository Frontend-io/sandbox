import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom'

import Home from '../../component/home/home'
import View from '../../component/view-image/view';
import { ProtectedRoute } from './protectedRoute';
import Login from '../../component/auth-pages/login';
import Register from '../../component/auth-pages/register';
import Profile from '../../component/profile/profile';
import Upload from '../../component/uploads/upload';
import CollectionsView from '../../component/collection-view/collection-view';


const RouterMain = ()=>(
    <>
        <Switch>
            <Route exact path="/" component={ Home } />

            <Route exact path="/login" component={ Login } />
            <Route exact path="/join" component={ Register } />
            <Route exact path="/images/:id" component={ View } />
            
            <ProtectedRoute  exact path="/upload" component={ Upload } />
            <ProtectedRoute  exact path="/@:id" component={ Profile } />
            <Route exact path="/collections/:id/:id" component={ CollectionsView } />
            
            <Redirect from="/:id/collections" exact to='/:id/#collection' component={ Profile } />
            <Redirect from="/images" exact to='/' component={ Home } />
            <Redirect from="*" exact to="/" component={ Home } />
        </Switch>
    </>
)

export default RouterMain