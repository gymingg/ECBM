import React from 'react'
import {Form, Input, Select} from 'antd'

const {Option} = Select


export default function AddForm (props) {
    //获取form表单
    const [form] = Form.useForm()
    //获取父组件传来的属性
    const {parentId,dataSource} = props
    //将form表单传到category组件
    props.setForm(form)
        return(
            <Form
                form = {form}
            >
                <Form.Item initialValue={parentId} name="parentId">
                    <Select >
                        <Option value='0'>一级分类</Option>
                        {
                            dataSource.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
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