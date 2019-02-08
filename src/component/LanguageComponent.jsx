import React from 'react';

import {LangContext} from '../context/LangContext.jsx' // 引入LangContext

export default class LanguageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelector: false
        };
        this.showLangSelector = this.showLangSelector.bind(this);
    }
    componentWillMount() {}

    // 显示语言选择选项
    showLangSelector() {
        this.setState({
            showSelector: true
        })
    }

    render() {

        const { showSelector } = this.state;

        return <LangContext.Consumer>
            {context => (
                <div>
                    {
                        showSelector
                            ?<div>
                                <div onClick={() => {context.changeLanguage('en-US')}}>英文</div>
                                <div onClick={() => {context.changeLanguage('zh-CN')}}>中文</div>
                            </div>
                            : <div onClick={this.showLangSelector}>
                                切换语言
                            </div>
                    }
                </div>
            )}
        </LangContext.Consumer>

    }
};
