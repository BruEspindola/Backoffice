import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import Product from './pages/admin/products';
import ProductEdit from './pages/admin/products/products.edit';
import ProductRegister from './pages/admin/products/products.register';

import User from './pages/admin/user';
import UserEdit from './pages/admin/user/user.edit';
import UserRegister from './pages/admin/user/user.register';

import Login from './pages/admin/login';
import ProductsDetails from './pages/user/product/products.details';

import PrivateRoute from './services/wAuth';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />

                <PrivateRoute path="/admin" exact component={Dashboard} />

                <PrivateRoute path="/admin/products" exact component={Product} />
                <PrivateRoute path="/product/:idProduct" exact component={ProductsDetails} />
                <PrivateRoute path="/admin/products/register" exact component={ProductRegister} />
                <PrivateRoute path="/admin/products/edit/:idProduct" exact component={ProductEdit} />

                <PrivateRoute path="/admin/user" exact component={User} />
                <PrivateRoute path="/admin/user/register" exact component={UserRegister} />
                <PrivateRoute path="/admin/user/edit/:idUser" exact component={UserEdit} />
            </Switch>
        </BrowserRouter>
    )
}