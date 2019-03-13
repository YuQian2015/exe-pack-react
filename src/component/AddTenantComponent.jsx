/**
 * Created by YuQian on 2/15/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, Icon, Switch, Input, Button, Row, Col,
} from 'antd';
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
            <Form onSubmit={this.handleSubmit} className="tenant-add-form">
                <h5>租户基础信息（必填）</h5>
                <Row gutter={24}>
                    <Col span={6} >
                        <Form.Item validateStatus={tenantIdError ? 'error' : ''} help={tenantIdError || ''} >
                            {
                                getFieldDecorator('tenantId', { rules: [{ required: true, message: '请输入租户ID' }]})( <Input placeholder="输入租户ID" /> )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item validateStatus={appNameError ? 'error' : ''} help={appNameError || ''} >
                            {
                                getFieldDecorator('appName', { rules: [{ required: true, message: '请输入应用名' }]})( <Input placeholder="输入应用名" /> )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item validateStatus={tenantNameError ? 'error' : ''} help={tenantNameError || ''} >
                            {
                                getFieldDecorator('tenantNameError', { rules: [{ required: true, message: '请输入租户名' }]})( <Input placeholder="输入租户名" /> )
                            }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item>
                            <Input placeholder="输入租户ID" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    {...formItemLayout}
                    label="该租户是否是通用包租户"
                >
                    {getFieldDecorator('switch', { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="是否有定制"
                >
                    {getFieldDecorator('switch', { valuePropName: 'checked' })(
                        <Switch />
                    )}
                </Form.Item>

                <h5>租户版本（必填）</h5>
                <h5>租户地址信息（选填）</h5>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

// 定义PropTypes
AddTenantComponent.propTypes = {
};

export default Form.create({ name: 'horizontal_login' })(withRouter(AddTenantComponent));
