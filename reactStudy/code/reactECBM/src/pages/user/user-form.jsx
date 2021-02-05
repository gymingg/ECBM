import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加/修改用户的form组件
 */
export default class UserForm extends PureComponent {
  
  state={
    user:{}
  }

  form = React.createRef()

  UNSAFE_componentWillMount(){
      this.setState({
          user:this.props.user
      })
  }

  componentDidMount () {
    this.props.setForm(this.form)
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
        user:nextProps.user
    })
    console.log(nextProps)
    const user = nextProps.user
    //根据是否有接收到user来初始化表单
    if(user.username !== undefined){
        this.form.current.setFieldsValue(user)
    }else{
        this.form.current.setFieldsValue({
            username: '',
            role_id:'',
            phone:'',
            email:''
        })
    }
    
  }

  render() {
    const {user} = this.state
    const {roles} = this.props
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form {...formItemLayout} ref={this.form}>
        <Item label='用户名' name="username" initialValue={user.username}>
            <Input placeholder='请输入用户名'/>
        </Item>

        {
          user._id ? null : (
            <Item label='密码' name="password" initialValue={user.password}>
                <Input type='password' placeholder='请输入密码'/>
            </Item>
          )
        }

        <Item label='手机号' name="phone" initialValue={user.phone}>
            <Input placeholder='请输入手机号'/>
        </Item>
        <Item label='邮箱' name="email" initialValue={user.email}>
            <Input placeholder='请输入邮箱'/>
        </Item>

        <Item label='角色' name="role_id" initialValue={user.role_id}>
            <Select>
            {
                roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
            }
            </Select>
        </Item>
      </Form>
    )
  }
}