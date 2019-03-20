/**
 * Created by YuQian on 2/15/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

import SlateRichTextComponent from './SlateRichTextComponent.jsx'

import { Form, Icon, Switch, Input, Button, Row, Col, Checkbox } from 'antd';

import QueueAnim from 'rc-queue-anim';
import Highlight from 'react-highlight';

import {withRouter} from "react-router-dom"; // 用这个方法来包裹组件，可以控制路由的跳转

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddTenantComponent extends React.Component {
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
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,} = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const tenantIdError = isFieldTouched('tenantId') && getFieldError('tenantId');
        const appNameError = isFieldTouched('appName') && getFieldError('appName');
        const tenantNameError = isFieldTouched('tenantName') && getFieldError('tenantName');
        return <div className="TenantListComponent">
            <QueueAnim type='bottom'>
                <Form onSubmit={this.handleSubmit} className="tenant-add-form" key="tenant-add-form">
                    <h3>租户基础信息（必填）</h3>
                    <Row gutter={24}>
                        <Col span={6} >
                            <Form.Item validateStatus={tenantIdError ? 'error' : ''} help={tenantIdError || ''} >
                                {
                                    getFieldDecorator('tenantId', { rules: [{ required: true, message: '请输入租户ID' }]})( <Input placeholder="输入租户ID（必填）" /> )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item validateStatus={appNameError ? 'error' : ''} help={appNameError || ''} >
                                {
                                    getFieldDecorator('appName', { rules: [{ required: true, message: '请输入应用名' }]})( <Input placeholder="输入应用名（必填）" /> )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item validateStatus={tenantNameError ? 'error' : ''} help={tenantNameError || ''} >
                                {
                                    getFieldDecorator('tenantNameError', { rules: [{ required: true, message: '请输入租户名' }]})( <Input placeholder="输入租户名（必填）" /> )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item>
                                <Input placeholder="租户共用ID（可选）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="segment">
                        <Row gutter={24}>
                            <Col span={6} >
                                <Form.Item label="该租户是否是通用包租户" >
                                    {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                        <Switch />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item label="是否有定制" >
                                    {getFieldDecorator('isCustomized', { valuePropName: 'checked' })(
                                        <Switch />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <h3>租户版本（必填）</h3>
                    <Row gutter={24}>
                        <Col span={4} >
                            <Form.Item label="APP" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="微信版" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="企业微信版" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="钉钉版" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="内嵌版" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4} >
                            <Form.Item label="PC版" >
                                {getFieldDecorator('isCommon', { valuePropName: 'checked' })(
                                    <Switch />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3>租户地址信息（选填）</h3>
                    <h3>租户ICON</h3>
                    <h3>简介/描述（选填）</h3>
                    <SlateRichTextComponent />
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </QueueAnim>

        </div>
    }
}

// 定义PropTypes
AddTenantComponent.propTypes = {
};

export default Form.create({ name: 'horizontal_login' })(withRouter(AddTenantComponent));
