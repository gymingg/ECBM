import React from 'react'
import {Card,Table,Select,Button,Input, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/linkButton'
import axios from 'axios'
const Option = Select.Option
export default class Home extends React.Component{
    state = {
        columns:[
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '商品详情',
                dataIndex: 'desc',
                key: 'desc',
              },
              {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (c)=>{return("￥"+c)}
              },
              {
                title: '状态',
                key: 'status',
                width:160,
                render:(product)=> {
                    let newStatus = product.status === 1?2:1
                    const {_id} = product
                    return( <span > <Button onClick={()=>this.updateStatus(_id, newStatus)} type="primary">{product.status === 1?'下架':'上架'}</Button> <span>{product.status === 1?'在售':'下架'}</span></span>)
                }
              },
              {
                title: '操作',
                key: 'operation',
                width:100,
                render:(product)=>{return (<span><LinkButton onClick={()=>{this.props.history.push('product/details',product)}}>详情</LinkButton> <LinkButton onClick={() => this.props.history.push('/product/addProduct',product)}>修改</LinkButton></span>)}
              },
        ],
        dataSource:[
        ],
        total:0,
        pageSize:3
    }

    //更新商品状态
    updateStatus = async (productId, status) => {
        const {data:result} = await axios.post('/manage/product/updateStatus',{productId,status})
        if(result.status===0) {
          message.success('更新商品成功')
          this.getProducts(this.pageNum)
        }
      }

    //获取商品
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const {data:res} = await axios.get('/manage/product/list',{params:{pageNum:pageNum,pageSize:this.state.pageSize}})
        if(res.status === 0){
            this.setState({
                total:res.data.total,
                dataSource:res.data.list
            })
        }
    }
    componentDidMount(){
        this.getProducts(1)
    }
    render(){
        const title = (<span>
                <Select value="0" style={{width:150}}>
                    <Option value="0">按名称搜索</Option>
                    <Option value="1">按详情搜索</Option>
                </Select>
                <Input style={{width:300,margin:10}} name="serachInfo" placeholder="关键字"></Input>
                <Button type="primary">搜索</Button>
            </span>)
        const extra = (<Button type="primary" onClick={()=> {this.props.history.push('/product/addProduct')}}> <PlusOutlined  />添加商品</Button>)
        const {dataSource,columns,total} = this.state
        return(
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table 
                    pagination={{
                        current: this.pageNum,
                        total,
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                    rowKey="_id"
                    dataSource={dataSource} 
                    columns={columns}>
                </Table>
            </Card>
        )
    }
}