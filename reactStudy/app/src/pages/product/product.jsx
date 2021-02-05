import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import AddProduct from './pages/addProduct.jsx'
import Home from './pages/home.jsx'
import Detail from './pages/detail.jsx'

//商品页面组件
export default class Product extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/product" exact={true} component={Home}></Route>
                <Route path="/product/addProduct" component={AddProduct}></Route>
                <Route path="/product/details" component={Detail}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}