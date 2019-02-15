/**
 * Created by YuQian on 2/9/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {Table, Button, Icon, Row, Col, AutoComplete} from 'antd';

import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转
const ButtonGroup = Button.Group;


// 引入connect来使被provider包裹的react组件连接到redux的store
import {connect} from 'react-redux';
// 引入请求数据的action
import {getTenantList} from '../action/tenantAction';

class TenantListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                pageSize: 40,
            },
            columns: [{
                dataIndex: 'icon',
                key: 'icon',
                align: 'center',
                render: icon => <img src={`${icon?icon:'http://exe.moyufed.com/1545874424004.png'}?imageView2/5/w/20/h/20`}/>,
                width: 50,

            }, {
                title: '租户ID',
                dataIndex: 'tenantId',
                key: 'tenantId',
            }, {
                title: '应用名',
                dataIndex: 'appName',
                key: 'appName',
            }, {
                title: '租户名',
                dataIndex: 'tenantName',
                key: 'tenantName',
            }, {
                title: '通用包',
                dataIndex: 'isCommon',
                key: 'isCommon',
                align: 'center',
                render: isCommon => isCommon ? <Icon type="check"/> : ''
            }, {
                title: '定制',
                dataIndex: 'isCustomized',
                key: 'isCustomized',
                align: 'center',
                render: isCustomized => isCustomized ? <Icon type="check"/> : ''
            }, {
                title: 'App版',
                dataIndex: 'app',
                key: 'app',
                align: 'center',
                render: app => app ? <Icon type="check"/> : ''
            }, {
                title: '微信版',
                dataIndex: 'wx',
                key: 'wx',
                align: 'center',
                render: wx => wx ? <Icon type="check"/> : ''
            }, {
                title: '企业微信版',
                dataIndex: 'workWx',
                key: 'workWx',
                align: 'center',
                render: workWx => workWx ? <Icon type="check"/> : ''
            }, {
                title: '钉钉版',
                dataIndex: 'dd',
                key: 'dd',
                align: 'center',
                render: dd => dd ? <Icon type="check"/> : ''
            }, {
                title: '内嵌版',
                dataIndex: 'inlay',
                key: 'inlay',
                align: 'center',
                render: inlay => inlay ? <Icon type="check"/> : ''
            }, {
                title: 'PC版',
                dataIndex: 'pc',
                key: 'pc',
                align: 'center',
                render: pc => pc ? <Icon type="check"/> : ''
            }, {
                title: '操作',
                dataIndex: 'isLocked',
                key: 'isLocked',
                align: 'center',
                render: isLocked => isLocked ? <Icon type="lock" theme="twoTone"/> : <Icon type="unlock"/>
            }, {
                title: '记录',
                dataIndex: 'valid',
                align: 'center',
                key: 'valid',
                render: valid => !valid?<Button size="small" type="disabled">已失效</Button>:<Button size="small" type="primary">查看</Button>
            }],
            tenantListDataSource: [],
            autoCompleteDataSource: [],
            tenantType: '',
            filterValue: ''
        };
        this.setList = this.setList.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addTenant = this.addTenant.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            autoCompleteDataSource: nextProps.tenantList.map(item => item.tenantId),
            tenantListDataSource: nextProps.tenantList
        })
    }

    // 组件将要加载
    componentWillMount() {
        this.props.getTenantList();
    }

    // 组件挂载完毕
    componentDidMount() {

    }

    setList(value) {
        const {tenantType} = this.state;
        let list = this.props.tenantList;
        if (value) {
            list = list.filter(item => item.tenantId.indexOf(value) === 0);
        }
        if (tenantType) {
            list = list.filter(item => item[tenantType]);
        }
        this.setState({
            tenantListDataSource: list,
            autoCompleteDataSource: list.map(item => item.tenantId)
        })
    }

    // 选择自动补全的文字之后触发
    onSelect(value) {
        this.setList(value)
    }

    // 自动补全被触发之后
    handleSearch(value) {
        this.setList(value)
    }

    // 修改查询租户的类型
    changeType(tenantType) {
        this.setState({
            tenantType,
            filterValue: ''
        }, () => {
            this.setList()
        })
    }

    // 添加租户
    addTenant() {
        this.props.history.push('add-tenant')
    }

    render() {
        const {columns, pagination, tenantType, tenantListDataSource, autoCompleteDataSource} = this.state;
        return <div className="TenantListComponent">
            <Row>
                <Col span={20}>
                    <AutoComplete
                        dataSource={autoCompleteDataSource}
                        style={{width: 200}}
                        onSelect={this.onSelect}
                        onSearch={this.handleSearch}
                        placeholder="输入租户ID"
                        value={this.state.filterValue}
                        onChange={value => {this.setState({filterValue: value})}}
                    />
                    &nbsp;
                    <ButtonGroup>
                        <Button type={tenantType === ''?'primary':''} onClick={() => this.changeType('')}>All</Button>
                        <Button type={tenantType === 'app'?'primary':''} onClick={() => this.changeType('app')}>App版</Button>
                        <Button type={tenantType === 'wx'?'primary':''} onClick={() => this.changeType('wx')}>微信版</Button>
                        <Button type={tenantType === 'workWx'?'primary':''} onClick={() => this.changeType('workWx')}>企业微信版</Button>
                        <Button type={tenantType === 'dd'?'primary':''} onClick={() => this.changeType('dd')}>钉钉版</Button>
                        <Button type={tenantType === 'inlay'?'primary':''} onClick={() => this.changeType('inlay')}>内嵌版</Button>
                        <Button type={tenantType === 'pc'?'primary':''} onClick={() => this.changeType('pc')}>PC版</Button>
                    </ButtonGroup>
                </Col>
                <Col span={4}>
                    <Button style={{float: 'right'}} type="primary" onClick={this.addTenant}>添加租户</Button>
                </Col>
            </Row>
            <br/>
            <Table pagination={pagination} dataSource={tenantListDataSource} columns={columns} rowKey="_id" bordered
                   size="middle"/>
        </div>
    }
}

// 定义PropTypes
TenantListComponent.propTypes = {
    getTenantList: PropTypes.func.isRequired,
    tenantList: PropTypes.array.isRequired
};

// 创建一个方法将redux的state转换成props
const mapStateToProps = state => ({
    // 这里使用的state.user 是在 reducer/index.js 文件中的 根reducer里面定义的
    tenantList: state.tenant.tenantList
});

export default connect(mapStateToProps, {getTenantList})(withRouter(TenantListComponent));
