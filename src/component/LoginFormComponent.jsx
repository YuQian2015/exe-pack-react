/**
 * Created by YuQian on 2/8/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Button, Input} from 'antd';

import {FormattedMessage} from 'react-intl';

import MD5 from "crypto-js/md5";

import LanguageComponent from './LanguageComponent.jsx'; // 引入组件

import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转

import LocalDB from 'local-db';
const userCollection = new LocalDB('user');

// 引入connect来使被provider包裹的react组件连接到redux的store
import { connect } from 'react-redux';
// 引入请求数据的action
import { userLogin } from '../action/userAction';

class LoginFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            userId: "E3031"
        };
        this.doLogin = this.doLogin.bind(this);
    }

    // 组件将要加载
    componentWillMount() {

    }

    // 组件挂载完毕
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.loginData && nextProps.loginData.token){
            userCollection.drop();
            userCollection.insert({
                time: new Date().getTime(),
                token: nextProps.loginData.token,
                user: nextProps.loginData.user
            });
            this.props.history.replace("/home");
        }
    }

    // 执行登录
    doLogin() {
        let {userId, password} = this.state;
        password = MD5(password).toString(); // md5加密

        this.props.userLogin(userId, password);
    }

    render() {
        return <div className="LoginFormComponent">
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
            <Input.Group size="large">
                <FormattedMessage id='intl.input.userId.title'>
                    {title =>
                        <FormattedMessage id='intl.input.userId.placeholder'>
                            {placeholder => <Input type="password" allowClear={true} value={this.state.userId}
                                                   onChange={event => this.setState({userId: event.target.value})} title={title} placeholder={placeholder} />}
                        </FormattedMessage>
                    }
                </FormattedMessage>
                <br/><br/>
                <FormattedMessage id='intl.input.password.title'>
                    {title =>
                        <FormattedMessage id='intl.input.password.placeholder'>
                            {placeholder => <Input type="password" allowClear={true} value={this.state.password}
                                onChange={event => this.setState({password: event.target.value})} title={title} placeholder={placeholder} />}
                        </FormattedMessage>
                    }
                </FormattedMessage>
                <br/><br/>
                <FormattedMessage id='intl.login'>
                    {text =>
                        <Button size="large" onClick={this.doLogin} block={true} type='primary'> {text} </Button>
                    }
                </FormattedMessage>
            </Input.Group>
        </div>
    }
}

// 定义PropTypes
LoginFormComponent.propTypes = {
    userLogin: PropTypes.func.isRequired,
    loginData: PropTypes.object.isRequired
};


// 创建一个方法将redux的state转换成props
const mapStateToProps = state => ({
    // 这里使用的state.user 是在 reducer/index.js 文件中的 根reducer里面定义的
    loginData: state.user.loginData
});

export default connect(mapStateToProps, { userLogin })(withRouter(LoginFormComponent));
