import React from 'react'
import {Form, Input} from 'antd'

export default function UpdateCategory (props){
    const [form] = Form.useForm()
    const categoryName = props.categoryName
    console.log(categoryName)
    //设定初始值，因为initValue无法通过setstate更新
    form.setFieldsValue({
        'categoryName': categoryName
        })
    props.setForm(form)
    return (
        <Form form={form}>
            <Form.Item initialValue={categoryName} name="categoryName" rules={[{required: true,message:'请输入分类名'}]}>
                <Input placeholder="请输入分类名"></Input>
            </Form.Item>
        </Form>
    )
}