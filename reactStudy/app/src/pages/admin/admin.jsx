import React from 'react'
import {Route, Switch} from 'react-router-dom' 
import {Redirect} from 'react-router-dom'
import store from 'store'
import { Layout } from 'antd';
import './admin.less'
import LeftNav from '../../components/left-nav/left-nav.jsx'
import Header from '../../components/header/header.jsx'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const { Footer, Sider, Content } = Layout;

//后台管理的组件
export default class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:null
        }
    }
    UNSAFE_componentWillMount(){
        let user = store.get('user')
        this.setState({
            user
        })
    }
    
    render(){
        const user = this.state.user;
        if(!user || !user._id) {
            // message.error('请登入')
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Layout className="container" >
                <Sider style={{ height: '100vh', left: 0,overflow: 'auto',position: 'fixed',}}>
                    <LeftNav {...this.props}></LeftNav>
                </Sider>
                <Layout
                style={{ marginLeft: 200,padding: 10 }}
                >
                    <Header {...this.props} className="header" username={user.username}></Header>
                    <Content className="content" style={{backgroundColor:'white',margin:'15px 0 0 0',minHeight:'100vh'}}>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Redirect to='/home' />
                    </Switch>
                    </Content>
                    <Footer className="footer">如页面显示不全，建议使用谷歌浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}