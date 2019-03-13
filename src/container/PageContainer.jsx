/**
 * Created by YuQian on 12/1/2018.
 */
import React from 'react';

import {Layout, Menu, Avatar} from 'antd';

const {Header, Content, Footer} = Layout;

import LanguageComponent from '../component/LanguageComponent.jsx'; // 引入组件
import UserAvatarComponent from '../component/UserAvatarComponent.jsx'; // 引入组件

import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转

import LocalDB from 'local-db';

const userCollection = new LocalDB('user'); // 需要使用本地存储时，这里存储的是user

//react 国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import {zh_CN} from '../i18n/zh_CN'; // 中文
import {en_US} from '../i18n/en_US'; // 英文
import zh from 'react-intl/locale-data/zh';// react-intl语言包
import en from 'react-intl/locale-data/en';// react-intl语言包
addLocaleData([...en, ...zh]); // 需要放入本地数据库

import {LangContext} from '../context/LangContext.jsx'; // 引入LangContext

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: navigator.language
        };
        this.goTo = this.goTo.bind(this);
    }

    // 组件将要加载
    componentWillMount() {
        // const user = userCollection.query({}); // 读取本地存储的内容
        // if (user.length == 0) {
        //     this.props.history.replace("/sign-in"); // 如果没有用户信息就跳转到登录页
        //     console.log('登录失效，退回登录页面');
        // }
    }

    // 组件挂载完毕
    componentDidMount() {
    }


    // 选择多语言
    chooseLocale() {
        const language = this.state.language;
        switch (language) {
            case 'en-US':
                return en_US;
            case 'zh-CN':
                return zh_CN;
            default:
                return en_US;
        }
    }

    // 选择语言
    changeLanguage(language = 'zh-CN') {
        this.setState({
            language
        })
    }

    goTo(route) {
        this.props.history.push(route)
    }

    render() {
        let {page, noFooter, noHeader} = this.props;
        let {language} = this.state;
        return <IntlProvider locale={language} key={language} messages={this.chooseLocale()}>
            <LangContext.Provider value={{changeLanguage: this.changeLanguage.bind(this)}}>
                <Layout className="layout">
                    {
                        noHeader ? null :
                            <Header>
                                <div className="logo"/>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    style={{lineHeight: '64px'}}
                                >
                                    <Menu.Item onClick={ () => this.goTo('pack-list')} key="1">打包列表</Menu.Item>
                                    <Menu.Item key="2">文件浏览</Menu.Item>
                                    <Menu.Item key="3">UI</Menu.Item>
                                    <Menu.Item key="4">用户/权限</Menu.Item>
                                    <UserAvatarComponent />
                                    <LanguageComponent />
                                </Menu>
                            </Header>
                    }
                    <Content style={{padding: '0 50px'}}>
                        {page ? page : null}
                    </Content>
                    {noFooter ? null :
                        <Footer style={{textAlign: 'center'}}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    }
                </Layout>
            </LangContext.Provider>
        </IntlProvider>;
    }
}


export default withRouter(PageContainer);
