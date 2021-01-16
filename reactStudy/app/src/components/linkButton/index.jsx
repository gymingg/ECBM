import React from 'react'
import styles from'./linkButton.module.less'
export default class LinkButton extends React.Component{

    render(){
        return(
            <span className={styles.link}>{this.props.children}</span>
        )
    }
}