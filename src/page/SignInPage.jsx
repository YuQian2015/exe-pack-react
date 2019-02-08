import React from 'react';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

import MD5 from "crypto-js/md5";

import { Button, Segment } from 'react-onsenui'; // 引入UI库的Button组件


import UserService from '../service/UserService.jsx'; // 引入service

import {FormattedMessage} from 'react-intl';

import LanguageComponent from '../component/LanguageComponent.jsx'; // 引入组件

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // 只要这个对象里面的属性变了，页面就会渲染更新 使用this.setState可以改变这里面的值
            tel: '',
            password: '123456',
            loginName: '13950032928',
            smsCode: '',
            loginType: 1 // 1手机号验证码 2账号密码
        };
        this.changeType = this.changeType.bind(this); // 绑定上下文，好让changeType里面可以使用this,比如使用this.setState
        this.doSignIn = this.doSignIn.bind(this);
    }
    componentWillMount() {}

    changeType(type) {
        this.setState({
            loginType: type
        })


    }
    doSignIn() {
        let { loginName, password } = this.state;
        password = MD5(password).toString(); // md5加密
        UserService.signIn({ loginName, password }).then(res => {
            if(res && res.success) {
                this.props.history.replace("/exhibition");
            } else {
                alert(res.message);
            }
        }).catch(error => {
            alert('请求失败')
        })
    }
    render() {
        const { loginType } = this.state;
        const page = (<div className="SignInPage">
            <div className="sign-in-form">
                <LanguageComponent />
                <FormattedMessage
                    tagName="p"
                    id='intl.signin.great'
                    description='欢迎'
                    defaultMessage='{city} 欢迎你'
                    values={{
                        city: '厦门'
                    }}
                />
                <Segment>
                    <button onClick={() => {this.changeType(1)}}><FormattedMessage id='intl.signin.phone' /></button>
                    <button onClick={() => {this.changeType(2)}}><FormattedMessage id='intl.signin.account' /></button>
                </Segment>
                {
                    loginType == 1
                        ?<div className="input-box">
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({tel: event.target.value})} placeholder="输入手机号" type="tel" />
                                <div  className="input-ft">验证码</div>
                            </div>
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({smsCode: event.target.value})} placeholder="输入验证码" type="password" />
                            </div>
                        </div>:
                        <div className="input-box">
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({loginName: event.target.value})} placeholder="输入账号" type="text" />
                            </div>
                            <div className="input-container">
                                <input className="input-filed" onChange={event => this.setState({password: event.target.value})} placeholder="输入密码" type="password" />
                            </div>
                        </div>
                }
                <Button modifier="large--cta" onClick={this.doSignIn}>
                    登录
                </Button>
            </div>
        </div>);
        return <PageContainer page={page} noBack={true} noHeader={true} />
    }
};
