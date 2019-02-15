/**
 * Created by YuQian on 2/8/2019.
 */
import React from 'react';

import { Breadcrumb } from 'antd';

import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器
import TenantListComponent from '../component/TenantListComponent.jsx';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // 组件将要加载
    componentWillMount() {
    }

    // 组件挂载完毕
    componentDidMount() {
    }

    render() {
        const page = <div className="HomePage">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <TenantListComponent />
            </div>
        </div>;
         return <PageContainer page={page} />
    }
}
