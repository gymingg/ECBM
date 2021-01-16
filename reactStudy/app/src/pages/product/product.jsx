import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AddProduct from './pages/addProduct.jsx'
import Home from './pages/home.jsx'
import Detail from './pages/detail.jsx'

export default class Product extends React.Component{
    render(){
        return(
            <Switch>
                <Route to="/product" exact component={Home}></Route>
                <Route to="/product/addProduct" component={AddProduct}></Route>
                <Route to="/product/details" component={Detail}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}