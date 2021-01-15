import React from 'react'
import {Form, Input} from 'antd'

export default function UpdateCategory (props){
    const [form] = Form.useForm()
    const categoryName = props.categoryName
    console.log(categoryName)
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

// export default class UpdateCategory extends React.Component{
//     formRef = React.createRef()
//   componentDidMount() {
//     console.log(this.formRef.current)
//     this.formRef.current.setFieldsValue({ name: "default name" });
//   }
//   fn = () => {
//       this.props.setForm(this.formRef.current)
//   }
//     render(){
//         this.fn()
//         console.log(this.formRef.current)
//         // this.formRef.current.setFieldsValue({
//         //     'categoryName': categoryName
//         // })
//         //this.formRef.current.setFieldsValue({ 'categoryName': "categoryName" });
//         const categoryName = this.props.categoryName
//         return (
//             <Form ref={this.formRef}>
//               <Form.Item initialValue={categoryName} name="categoryName" rules={[{required: true,message:'请输入分类名'}]}>
//                 <Input placeholder="请输入分类名"></Input>
//               </Form.Item>
//             </Form>
//         )
//     }
// }