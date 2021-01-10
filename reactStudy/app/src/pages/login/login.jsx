import React from 'react'
import './login.less'
import logo from './images/logo.png'
import { Button,Form, Input} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//antd登入表单
const NormalLoginForm = () => {
    //	提交表单且数据验证成功后回调事件
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号' },
          { min:4, message: '账号不得低于4位数'}]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
                { required: true, message: '请输入密码' },
                { min:4, message: '密码不得低于4位数'}
            ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  };

//登入的组件
export default class Login extends React.Component{
    render(){
        return (
            <div className="login">
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>欢迎来到后台管理页面</h1>
                </header>
                <div className="content">
                    <h1>LOGIN</h1>
                    <NormalLoginForm></NormalLoginForm>
                </div>
            </div>
        )
    }
}