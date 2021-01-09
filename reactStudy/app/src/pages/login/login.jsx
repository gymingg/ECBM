import React from 'react'
import styles from './login.module.less'

//登入的组件
export default class Login extends React.Component{
    render(){
        return (
            <div className={styles.login}>Login组件</div>
        )
    }
}