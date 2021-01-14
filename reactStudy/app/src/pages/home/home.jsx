import React from 'react'
import styles from './home.module.less'

export default class Home extends React.Component{
    render(){
        return(
            <div className={styles.title}>欢迎来到后台</div>
        )
    }
}