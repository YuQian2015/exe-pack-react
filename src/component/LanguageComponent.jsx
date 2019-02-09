import React from 'react';

import {LangContext} from '../context/LangContext.jsx' // 引入LangContext
import {Menu, Dropdown, Icon} from 'antd';

export default class LanguageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const menu = <LangContext.Consumer>
            {context => (
                <Menu>
                    <Menu.Item onClick={() => {
                        context.changeLanguage('en-US')
                    }}>English</Menu.Item>
                    <Menu.Item onClick={() => {
                        context.changeLanguage('zh-CN')
                    }}>中文</Menu.Item>
                </Menu>
            )}
        </LangContext.Consumer>;

        return <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" style={{float: 'right'}}>
                切换语言 <Icon type="down"/>
            </a>
        </Dropdown>
    }
};
