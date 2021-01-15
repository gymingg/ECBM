import React from 'react'
import {Form, Input, Select} from 'antd'
import {  Button, Checkbox } from 'antd';
const {Option} = Select


export default class AddForm extends React.Component{
    onFinish = () => {
        console.log(1)
    }
    render(){
        return(
            <Form
              onFinish={this.onFinish}
            >
                <Form.Item>
                    <Select defaultValue="0">
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>电脑</Option>
                        <Option value='2'>手机</Option>
                    </Select>
                </Form.Item>
                <Form.Item 
                    name="categoryName" 
                    rules={[{ required: true, message: '请输入分类名称' }]}
                >
                    <Input placeholder="请输入分类名称"></Input>
                </Form.Item>
            </Form>
        )
    }
}