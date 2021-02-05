import React from 'react'
import styles from'./linkButton.module.less'
export default class LinkButton extends React.Component{

    render(){
        return(
            <span onClick={this.props.onClick} className={styles.link}>{this.props.children}</span>
        )
    }
}