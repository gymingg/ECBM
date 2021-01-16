import React from 'react'
import {Card,Table,Select,Button,Input} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/linkButton'
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
                render: (c)=>{console.log(c);return("￥"+c)}
              },
              {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width:160,
                render:(c)=> {return( <span > <Button type="primary">下架</Button> <span>{c === 1?'在售':'下架'}</span></span>)}
              },
              {
                title: '操作',
                key: 'operation',
                width:100,
                render:(c)=>{return (<div><LinkButton>详情</LinkButton> <LinkButton>修改</LinkButton></div>)}
              },
        ],
        dataSource:[
            {
                key: '1',
                name: '胡彦斌',
                price: 32,
                desc: '西湖区湖底公园1号',
                status:1
              },
              {
                key: '2',
                name: '胡彦祖',
                price: 32,
                desc: '西湖区湖底公园1号',
                status:1
              },
        ],

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
        const extra = (<Button type="primary"><PlusOutlined/>添加商品</Button>)
        const {dataSource,columns} = this.state
        return(
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table dataSource={dataSource} columns={columns}>

                </Table>
            </Card>
        )
    }
}