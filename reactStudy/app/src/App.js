import React from 'react';
import styles from './color.module.css'
import './color.css'
import { Button, message} from 'antd';


console.log(styles)
const data =[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football",id:'1'},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball",id:'2'},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball",id:'3'},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch",id:'4'},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5",id:'5'},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7",id:'6'}
];

class ProductRow extends React.Component{
  handleClick(){
      message.success('ant 测试')
  }
  render(){
    return(
      <tr>
        <td>
          {this.props.stocked === true?<span className='red'>{this.props.name}</span> : <span style={{color: 'red'}}>{this.props.name}</span>}
        </td>
        <td>
          <span>{this.props.price}</span>
        </td>
        <td><Button className={styles.red} type="primary" onClick={this.handleClick}>Button</Button></td>
      </tr>
    )
  }
}
class ProductCategoryRow extends React.Component{
  render(){
    return(
      <tr><th colSpan='2' className={styles.red}>{this.props.category}</th></tr>  
    )
  }
}
class ProductTable extends React.Component{
  render(){
    return(
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          {this.props.children}
          
        </tbody>
      </table>
    )
  }
}
class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(e){
    this.props.onCheckBoxClick(e.target.checked)
  }
  handleChange(e){
    this.props.onInputChange(e.target.value)
  }
  render(){
    return (
      <div>
        <input type="text" value={this.props.inputValue} placeholder="Search..." onChange={this.handleChange}></input>
        <input type="checkbox"  onClick={this.handleClick}></input>
      </div>
    )
  }
}

class Container extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checked:false,
      inputValue:''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(checked){
    this.setState({
      checked
    })
  }
  handleChange(value){
    this.setState({
      inputValue:value
    })
  }
  render(){
    let lastCategory=null
    return(
      <div>
        <SearchBar inputValue={this.state.value} onInputChange={this.handleChange} onCheckBoxClick={this.handleClick}></SearchBar>
        <ProductTable>
          {
            data.map((product) => {
              if(product.name.indexOf(this.state.inputValue) === -1){return}
              if(this.state.checked && !product.stocked) {return}
              if(product.category !== lastCategory){
                lastCategory = product.category
                return  (
                  <React.Fragment key={product.id}>
                    <ProductCategoryRow key={product.category} category={product.category}></ProductCategoryRow>
                    <ProductRow stocked={product.stocked} key={product.id} name={product.name} price={product.price}></ProductRow>
                  </React.Fragment>
                )
              }
              return <ProductRow stocked={product.stocked} key={product.id} name={product.name} price={product.price}></ProductRow>
            })
          }
        </ProductTable>
      </div>
    )
  }
}

// ReactDOM.render(
//   <Container></Container>,
//   document.getElementById('root')
// )
export default Container