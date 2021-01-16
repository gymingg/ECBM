import React from 'react'
import {Form, Input, Select} from 'antd'

const {Option} = Select


export default function AddForm (props) {
    const [form] = Form.useForm()
    const {parentId,dataSource} = props
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