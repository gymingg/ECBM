import React, {PureComponent} from 'react'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../static/menuList'

const Item = Form.Item

const { TreeNode } = Tree;

/*
添加分类的form组件
 */
export default class AuthForm extends PureComponent {

  constructor (props) {
    super(props)

    // 根据传入角色的menus生成初始状态
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  /*
  为父组件提交获取最新menus数据的方法
   */
  getMenus = () => this.state.checkedKeys


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
        if(item.children){
            pre.push(
                {
                    title:item.title,
                    key:item.key,
                    children:this.getTreeNodes(item.children)
                }
              )
        }else{
            pre.push(
                {
                    title:item.title,
                    key:item.key
                }
              )
        }
      
      return pre
    }, [])
  }

  // 选中某个node时的回调
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  


  UNSAFE_componentWillMount(){
      this.treeNodes = this.getTreeNodes(menuList)
  }

  // 根据新传入的role来更新checkedKeys状态
  /*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps (nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }

  render() {
    console.log('AuthForm render()')
    const {role} = this.props
    const {checkedKeys} = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={this.treeNodes}
        >
        </Tree>
      </div>
    )
  }
}