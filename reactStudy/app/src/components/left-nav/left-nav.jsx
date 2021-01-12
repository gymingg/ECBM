import React from "react";
import "./left-nav.less";
import image from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import menuInfo from '../../static/menuList.js'
const { SubMenu } = Menu;
export default class LeftNav extends React.Component {
    constructor(props){
        super(props)
        this.menuNodes = []
        this.openKey = ''
    }
    //动态渲染menu.item标签
    renderMenu(menuList){
        /**
         * 数据格式
         * {
            title: "首页", // 菜单标题名称
            key: "/home", // 对应的 path
            icon: "home", // 图标名称
            chileren:[] //子标签
            }
         */
        let path = this.props.location.pathname
        return menuList.reduce( (pre,item) => {
            //判断是否有子标签
            if (!item.children) {
                //无子标签则渲染menu.item
              pre.push(<Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key}>{item.title}</Link>
            </Menu.Item>)
            }else {
                const isOpenKey = item.children.find( citem => citem.key === path)
                if(isOpenKey){
                    this.openKey = item.key
                }
              pre.push(<SubMenu key={item.key} icon={item.icon} title={item.title}>
                {this.renderMenu(item.children)}
                </SubMenu>)
            }
            return pre
        },[])
    }
    UNSAFE_componentWillMount(){
        this.menuNodes =  this.renderMenu(menuInfo)
    }
  render() {
    let path = this.props.location.pathname
    return (
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={image} alt="logo" />
            <h1>MING</h1>
          </div>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
