import React from 'react'
import styles from './category.module.less'
import { Card } from 'antd';
import {
    ArrowRightOutlined,
    PlusOutlined
  } from '@ant-design/icons'
import {Button, Table} from 'antd'
import axios from 'axios'

export default class Category extends React.Component{
    state= {
        title:'一级分类',
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
              render:()=>(
                  <div>
                    <span className={styles.blue} style={{marginRight:'10px'}} >修改分类</span>
                    <span className={styles.blue} >查看子分类</span>
                  </div>
              )
            },
          ],
          dataSource : [],
          parentId:'0'
    }

    getCategory= async ()=>{
        const {data:dataSource} = await axios.get('/manage/category/list',{parentId:this.state.parentId})
        console.log(dataSource)
        if (dataSource.status === 0) {
            console.log(dataSource)
            this.setState({
                dataSource:dataSource.data
            })
        }
    }

    componentDidMount(){
        this.getCategory()
    }

    render(){
        const title = this.state.title
        const extra = (<Button type="primary"><PlusOutlined />添加分类</Button>)
        const columns = this.state.columns
        const data = this.state.dataSource
        return(
            <Card className={styles.container} title={title} extra={extra}>
                <Table rowKey='_id' pagination={{defaultPageSize:5,}} bordered columns={columns} dataSource={data} />
            </Card>
        )
    }
}