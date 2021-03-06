import React from 'react'
import {Card,Form,Input, Cascader, Button,message} from 'antd'
import LinkButton from '../../../components/linkButton'
import {ArrowLeftOutlined} from '@ant-design/icons'
import axios from 'axios'
import PictureUpload from './pictureUpload.jsx'
import RichTextEditor from './rich-text-editor.jsx'
const {TextArea} = Input
export default class AddProduct extends React.Component{

    state={
        options:[
        ]
    }
    //创建form表单的ref
    form = React.createRef()
    //创建pictureWall的ref
    pw = React.createRef()
    //创建富文本编辑器的ref
    editor = React.createRef()

    //获取选择一级分类后出现的二级分类的
    loadData = async selectedOptions => {
        //获取当前选中的一级分类
        const targetOption = selectedOptions[0];
        //出现加载的动画
        targetOption.loading = true;
        // load options lazily
        
        //获取二级分类信息
        const res = await this.getCategory(targetOption.value)
        //如果有二级分类
        if(res && res.length>0){
            //创建当前一级分类的子属性
            targetOption['children'] = []
            //停止加载动画
            targetOption.loading = false;
            //将二级分类添加到数组中
            res.map(item => {
                return targetOption['children'].push({
                    value:item._id,
                    label:item.name,
                    isLeaf:true
                })
            })
        //无二级分类
        }else{
            //停止加载动画
            targetOption.loading = false;
            //将当前一级分类设为叶子节点
            targetOption.isLeaf = true
        }
        this.setState({
            options:[...this.state.options]
        })
        
      };
    
    //验证
    validateNumber(rules,value){
        if(value*1 > 0){
            return Promise.resolve()
        }else{
            return Promise.reject('价格必须大于0')
        }
    }
    
    //初始化分类列表
    initeCategory = async (categories) => {
        const options =[]
        //添加分类
        categories.map(item => {
           return options.push({
                value:item._id,
                label:item.name,
                isLeaf:false
            })
        })
        
        //如果是修改商品
        if(this.isPut ){
            const {pCategoryId,categoryId} = this.product
            if(pCategoryId !== '0'){
                //根据一级分类id获取二级分类
                const subCategory = await this.getCategory(pCategoryId)
                const targetOption = options.find(item=>item.value === pCategoryId)
                targetOption.children = []
                subCategory.map(item => {
                    return targetOption.children.push({
                        value:item._id,
                        label:item.name,
                        isLeaf:true
                    })
                })
            }
            }
        this.setState({
            options
        })
    }

    async getCategory(parentId){
        const {data:res} = await axios.get('/manage/category/list',{params:{parentId}})
        if(res.status === 0) {
            //若分类是一级分类
            if (parentId === '0') {
                this.initeCategory(res.data)
            }else{
                return res.data
            }
        }
    }

    //添加或修改商品
    onSubmit = async (values) => {
        //获取图片、细节
        const imgs = this.pw.current.getFileList()
        const detail = this.editor.current.getDetail()
        const {category,name,price,desc} = values
        console.log(values)
        let pCategoryId,categoryId
        //判断是否是一级分类
        if(category.length === 1){
            pCategoryId = '0'
            categoryId = category[0]
        }else{
            pCategoryId = category[0]
            categoryId = category[1]
        }
        //判断是否是修改商品
        if(!this.isPut){
            const product = {name,detail,imgs,desc,price,pCategoryId,categoryId}
            console.log(product)
            const {data:res} = await axios.post('/manage/product/add',product)
            if(res.status === 0) {
                message.success('添加商品成功')
            }
        }else{
            //修改商品需要传值_id
            const {_id} = this.product
            const product = {name,detail,imgs,desc,price,pCategoryId,categoryId,_id}
            const {data:res} = await axios.post('/manage/product/update',product)
            if(res.status === 0) {
                message.success('更新商品成功')
            }
        }
        //修改后返回
        this.props.history.goBack()
    }

    
    UNSAFE_componentWillMount () {
        const product = this.props.location.state
        this.isPut = !!product
        this.product = product || {}
        //判断是否是更改商品
        if (this.isPut){
            const {pCategoryId,categoryId} = product
            if(pCategoryId === '0'){
                this.category = [categoryId] || []
            }else{
                this.category = [pCategoryId,categoryId] || []
            }   
        }
    }

    //获取一级分类
    componentDidMount(){
        this.getCategory('0')
    }

    render(){
        const title = (<span style={{marginRight:'10px'}}><LinkButton><ArrowLeftOutlined onClick={() => this.props.history.goBack()}/></LinkButton>{this.isPut?"修改商品":"添加商品"}</span>)
        const {options}= this.state
        const product = this.product
        return(
            <Card title={title} >
                <Form
                    ref={this.form}
                    
                    labelCol={{span:3}}
                    wrapperCol={{span:8}}
                    onFinish={this.onSubmit}
                >
                    <Form.Item label="商品名称"
                        name="name"
                        initialValue={product.name}
                        rules={[{required:true,message:"必须输入商品名称"}]}
                    >
                        <Input  placeholder="请输入商品名称"></Input>
                    </Form.Item>
                    <Form.Item 
                        label="商品描述"
                        name="desc"
                        initialValue={product.desc}
                        rules={[{required:true,message:"商品描述必须输入"}]}
                    >
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="请输入商品描述"></TextArea>
                    </Form.Item>
                    <Form.Item label="商品价格"
                        name="price"
                        initialValue={product.price}
                        rules={[{required:true,message:"商品价格必须输入"},
                            {validator:this.validateNumber}
                        ]}
                    >
                        <Input placeholder="请输入商品的价格" type="number" addonAfter="元"></Input>
                    </Form.Item>
                    <Form.Item label="商品分类"
                        name="category"
                        initialValue={this.category}
                        rules={[{required:true,message:"商品分类必须选择"}]}
                    >
                        <Cascader options={options} loadData={this.loadData} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item label="商品图片">
                        <PictureUpload imgs={product.imgs} ref={this.pw}></PictureUpload>
                    </Form.Item>
                    <Form.Item label="商品详情" wrapperCol={{span:18}}>
                       <RichTextEditor 
                     detail={product.detail} ref={this.editor}></RichTextEditor>
                    </Form.Item>
                    <Form.Item  wrapperCol={ {offset: 2, span: 4} }><Button type="primary" htmlType="submit">提交</Button></Form.Item>
                </Form>
            </Card>
        )
    }
}