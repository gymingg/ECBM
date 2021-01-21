import React from 'react'
import styles from './header.module.less'
import jsonp from 'jsonp'
import menuInfo from '../../static/menuList'
import { Modal,} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import store from 'store'
const { confirm } = Modal;
export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            weather : '',
            currentTime: ''
        }
        this.intervalID = ''
        this.getWeather = this.getWeather.bind(this)
        this.getTime = this.getTime.bind(this)
        this.logout = this.logout.bind(this)
    }

    //jsonp获取天气信息
    getWeather(){
        return new Promise((resolve,reject) => {
            const url = `https://tianqiapi.com/api?version=v1&appid=41741935&appsecret=1WCZkBa7&city=深圳`
            jsonp(url,{}, async (err,data) => {
                if(!err) {
                    resolve(data)
                }else(
                    reject('获取失败')
                )
            })
        })
    }

    //获取当前时间
    getTime(){
        this.intervalID = setInterval(async ()=>{
            let date = new Date()
            let nowDate = date.toLocaleDateString()+ ' '+ date.toLocaleTimeString()
            await this.setState({
                currentTime:nowDate
            })

            // console.log(this.currentTime)
            // console.log(nowDate)
        },1000)
    }

    //获取当前页面标题
    getTitle(){
        const path = this.props.location.pathname
        let title
        menuInfo.forEach(item => {
            if(item.key === path) {
              return title = item.title
            }else if(item.children){
                const citem = item.children.find(citem =>  path.indexOf(citem.key) === 0)
                if(citem){
                  return  title = citem.title
                }
            }
        })
        this.title = title
        return title
    }

    logout(){
        confirm({
            title: '你确定要退出登入吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:() => {
              store.remove('user')
              this.props.history.replace('/login')
            }
          });
    }

    componentDidMount(){
        let weather = null
        this.getWeather().then(result => {
            weather = result.data[0].wea
            this.setState({
                weather
            })
        })
        this.getTime()
        this.getTitle()
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    render(){
        
        return (
            <div className={styles.container}>
                <div className={styles.headerTop}>
                    <span>Hello {this.props.username}</span>
                    <span className={styles.blue} onClick={this.logout}>退出</span>
                </div>
                <div className={styles.headerBottom}>
                    <div className={styles.headerBottomLeft}>{this.title}</div>
                    <div className={styles.headerBottomRight}><span>{this.state.currentTime} </span>{this.state.weather}</div>
                </div>
            </div>
        )
    }
}