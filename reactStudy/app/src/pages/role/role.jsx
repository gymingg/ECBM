import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import axios from 'axios'
import AddForm from './add-form.jsx'
import formateDate from './formateDate.js'
import AuthForm from './auth-form.jsx'
import store from 'store'
/*
角色路由
 */
export default class Role extends Component {

  state = {
    roles: [], // 所有角色的列表
    role: {}, // 选中的role
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
  }

  auth = React.createRef()

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  getRoles = async () => {
    const {data:result} = await axios.get('/manage/role/list')
    if (result.status===0) {
      const roles = result.data
      console.log(roles)
      this.setState({
        roles
      })
    }
  }


  onRow = (role) => {
    return {
      onClick: event => { // 点击行
        console.log('row onClick()', role)
        // alert('点击行')
        this.setState({
          role
        })
      },
    }
  }

  /*
  添加角色
   */
  addRole = async () => {
    console.log(this.form)
    console.log(this.form.current.getFieldValue('roleName'))
    const roleName = this.form.current.getFieldValue('roleName')
    const {data:res} = await axios.post('/manage/role/add',{roleName})
    if (res.status === 0) {
        this.setState({
            isShowAdd:false
        })
        message.success('添加成功')
        this.getRoles()
    }
  }

  /*
  更新角色
   */
    updateRole = async () => {
        const menus = this.auth.current.getMenus()
        const auth_name = store.get('user').username
        const auth_time = formateDate
        const _id = this.state.role._id
        const {data:res} = await axios.post('/manage/role/update',{menus,auth_name,auth_time,_id})
        if(res.status === 0 ){
            message.success('权限添加成功')
            this.getRoles()
            this.setState({
                isShowAuth:false
            })
        }
    }

   /**
    * 获取表单form
    */
   setForm = (form) => {
       this.form = form || {}
   }

   setTree = (auth) => {
       this.auth = auth
   }

  componentWillMount () {
    this.initColumn()
  }

  componentDidMount () {
    this.getRoles()
  }

  render() {

    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
      </span>
    )
    /**
     * 
     */
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: 3}}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => { // 选择某个radio时回调
              this.setState({
                role
              })
            }

          }}
          onRow={this.onRow}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
          }}
        >
          <AddForm setForm={(form) => this.setForm(form)}></AddForm>
        </Modal>
        
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
        
      </Card>
    )
  }
}