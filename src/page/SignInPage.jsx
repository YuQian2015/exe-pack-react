import React from 'react';
import { Row, Col } from 'antd';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器
import LoginFormComponent from '../component/LoginFormComponent.jsx'; // 引入组件

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const page = (<div className="SignInPage">
            <Row type="flex" justify="center" align="middle">
                <Col span={8}>
                    <LoginFormComponent />
                </Col>
            </Row>
        </div>);
        return <PageContainer page={page} noBack={true} noHeader={true}/>
    }
};
