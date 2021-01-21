import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
export default class AddForm extends Component {

  form = React.createRef()

  componentDidMount () {
    this.props.setForm(this.form)
  }

  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <Form ref={this.form}>
        <Item label='角色名称' {...formItemLayout}
              initialValue= ''
              rules = {[{required: true, message: '角色名称必须输入'}]}
              name="roleName"
        >
              <Input placeholder='请输入角色名称'/>
        </Item>
      </Form>
    )
  }
}
