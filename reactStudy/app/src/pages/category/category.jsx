import React from 'react'
import styles from './category.module.less'
import {
    ArrowRightOutlined,
    PlusOutlined
  } from '@ant-design/icons'
import {Button, Table, Modal, Card,message} from 'antd'
import axios from 'axios'
import AddForm from './components/addForm.jsx'
import UpdateCategory from './components/updateForm.jsx'
export default class Category extends React.Component{
    state= {
        columns : [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              key: 'operation',
              width:300,
              render:(categories)=>(
                  <div>
                    <span className={styles.blue} onClick={() => (this.showUpdateForm(categories))} style={{marginRight:'10px'}} >修改分类</span>
                    <span className={styles.blue} onClick={()=>(this.getSubCategory(categories))}>查看子分类</span>
                  </div>
              )
            },
          ],
          dataSource : [],
          subSource:[],
          parentId:'0',
          parentName:'一级分类',
          loading:false,
          isVisible: 0, //0全关闭，1展示添加对话框，2展示修改对话框
          categories:{},
          inputValue:''
    }

    //获取一级或二级分类
    getCategory = async (parentId)=>{
        this.setState({
            loading:true
        })
        parentId = parentId || this.state.parentId
        const {data:dataSource} = await axios.get('/manage/category/list',{params: {parentId}})
        if (dataSource.status === 0) {
            if(this.state.parentId === '0'){
                this.setState({
                    dataSource:dataSource.data,
                    loading:false
                })
            }else{
                this.setState({
                    subSource:dataSource.data,
                    loading:false
                })
            }
            
        }
    }


    //获取二级分类
    getSubCategory = async (categories) => {
        await this.setState({
            parentId:categories._id,
            parentName:categories.name
        })
        this.getCategory()
    }

    //回到一级分类
    showFirstCategory= () => {
        this.setState({
            parentName:'一级分类',
            parentId:'0',
            subSource:[]
        })
    }

    //展示添加表单
    showAddForm = () => {
        this.setState({
            isVisible:1
        })
    }

    //展示修改表单
    showUpdateForm = (categories) => {
        this.setState({
            isVisible:2,
            categories
        })
    }

    //隐藏表单
    hiddenForm = () =>{
        this.form.resetFields()
        this.setState({
            isVisible: 0
        })
    }

    //获取Input的值
    getInputValue = (e) => {
        console.log(e.target.value)
        this.setState({
            inputValue:e.target.value
        })
    }

    //添加商品分类
    addCategory = async () => {
        //判断表单是否通过验证，如果通过则执行下列操作
        this.form.validateFields().then(async values => {
            const {parentId,categoryName} = this.form.getFieldValue()
            const {data:res} = await axios.post('manage/category/add',{parentId,categoryName})
            if(res.status === 0){
                this.form.resetFields()
                this.hiddenForm()
                if(parentId === this.state.parentId){
                    this.getCategory()
                }else if(parentId === '0') {
                    this.getCategory('0')
                }
                
            }else{
                message.error('添加失败')
            }
        })
        //未通过验证执行
        .catch(err => {
            message.error('分类名不能为空')
        })
    }

    //修改分类信息
    updateCategory = async () => {
        this.form.validateFields().then(async (values) => {
                const id = this.state.categories._id
                const name = this.form.getFieldValue('categoryName')
                const {data:res} = await axios.post('/manage/category/update',{categoryId:id,categoryName:name})
                if(res.status === 0) {
                    this.form.resetFields()
                    this.hiddenForm()
                    this.getCategory()
                }
                else{
                    message.error('更新失败')
                }
            })
            .catch(err => {
                message.error('分类名不能为空')
            })
    }

    componentDidMount(){
        this.getCategory()
    }

    render(){
        const title = this.state.parentName ==='一级分类'?'一级分类':(<div><span onClick={this.showFirstCategory} style={{marginRight:'5px'}} className={styles.blue}>一级分类</span> <span> <ArrowRightOutlined/>{this.state.parentName} </span></div>)
        const extra = (<Button onClick={this.showAddForm} type="primary"><PlusOutlined />添加分类</Button>)
        const {columns, dataSource, subSource, parentId, loading, isVisible} = this.state;
        const categoryName = this.state.categories.name
        return( 
            <Card className={styles.container} title={title} extra={extra}>
                <Table loading={loading} rowKey='_id' pagination={{defaultPageSize:5,}} bordered columns={columns} dataSource={parentId==='0'? dataSource : subSource} />
                <Modal getContainer={false} title="添加分类" visible={isVisible===1?true:false} onOk={this.addCategory} onCancel={this.hiddenForm}>
                    <AddForm parentId={parentId} dataSource={dataSource} setForm={(form)=>{this.form = form}}></AddForm>
                </Modal>
                <Modal getContainer={false} title="修改分类" visible={isVisible===2?true:false} onOk={this.updateCategory} onCancel={this.hiddenForm}>
                    <UpdateCategory setForm={(form) => {this.form = form}} categoryName={categoryName}></UpdateCategory>
                </Modal>
            </Card>
        )
    }
}