/**
 * Created by YuQian on 2/15/2019.
 */
import React from 'react';

import AddTenantComponent from '../component/AddTenantComponent.jsx'
import PageContainer from '../container/PageContainer.jsx'; // 引入页面的容器

export default class AddTenantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 组件将要加载
    componentWillMount() {
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    render() {
        const page = <div className="AddTenantPage">
            <AddTenantComponent />
        </div>;
        return <PageContainer page={page} />;
    }
}
