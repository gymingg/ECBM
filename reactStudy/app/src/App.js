import React from 'react';
import { Button, message} from 'antd';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'


export default class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}