import React, {Component} from 'react'
import {
  Card,
  List
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import axios from 'axios'
import LinkButton from '../../../components/linkButton'
import BaseRoute from '../../../static/router.js'


const Item = List.Item


/*
Product的详情子路由组件
 */
export default class ProductDetail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount () {

    // 得到当前商品的分类ID
    const {pCategoryId, categoryId} = this.props.location.state
    if(pCategoryId==='0') { // 一级分类下的商品
      const {data:result} = await axios.get('/manage/category/info',{params:{categoryId}})
      const cName1 = result.data.name
      this.setState({cName1})
    } else { // 二级分类下的商品

      // 一次性发送多个请求, 只有都成功了, 才正常处理
      const results = await Promise.all([axios.get('/manage/category/info',{params:{categoryId:pCategoryId}}), axios.get('/manage/category/info',{params:{categoryId}})])
      const cName1 = results[0].data.data.name
      const cName2 = results[1].data.data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  render() {

    // 读取携带过来的state数据
    const {name, desc, price, detail, imgs} = this.props.location.state
    const {cName1, cName2} = this.state

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{marginRight: 10, fontSize: 20}}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    style={{height:'80px',width:'80px'}}
                    key={img}
                    src={BaseRoute.baseImageRoute + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
          </Item>

        </List>
      </Card>
    )
  }
}