/**
 * Created by YuQian on 12/1/2018.
 */
import React from 'react';
import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转

import LocalDB from 'local-db';
const userCollection = new LocalDB('user'); // 需要使用本地存储时，这里存储的是user

import { Page, BackButton, ToolbarButton, Toolbar, Icon  } from 'react-onsenui';

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
    }

    // 组件将要加载
    componentWillMount() {
        const user = userCollection.query({}); // 读取本地存储的内容
        if (user.length == 0) {
            this.props.history.replace("/sign-in"); // 如果没有用户信息就跳转到登录页
            console.log('登录失效，退回登录页面');
        }
    }

    // 组件挂载完毕
    componentDidMount() {
    }


    // 选择多语言
    chooseLocale(){
        const language = this.state.language;
        switch(language){
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


    render() {
        let { page, noBack, noHeader} = this.props;
        let { language } = this.state;
        //let tool = noHeader
        //        ?null
        //        :<Toolbar>
        //            <div className="left">
        //                {
        //                    noBack
        //                        ?null
        //                        :<BackButton>返回</BackButton>
        //                }
        //            </div>
        //            <div className="center">
        //                Title
        //            </div>
        //            <div className="right">
        //                <ToolbarButton>
        //                    <Icon icon="md-menu" />
        //                </ToolbarButton>
        //            </div>
        //        </Toolbar>
        let tool = "";

        return <Page renderToolbar={() => tool} className="PageContainer">
            <IntlProvider locale={language} key={language} messages={this.chooseLocale()}>
                <LangContext.Provider value={{changeLanguage: this.changeLanguage.bind(this)}}>
                    {page?page:null}
                </LangContext.Provider>
            </IntlProvider>
            </Page>
    }
}


export default withRouter(PageContainer);
