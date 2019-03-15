/**
 * Created by YuQian on 3/13/2019.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Highlight from 'react-highlight';
import { Icon, Button } from 'antd';

import QueueAnim from 'rc-queue-anim';

export default class PackItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: ['APP', '微信', '企业微信', '钉钉版', '内嵌版', 'PC版'],
            showCode: false
        };
        this.showCode = this.showCode.bind(this);
        this.activePack = this.activePack.bind(this);
    }

    showCode() {
        this.setState({
            showCode: !this.state.showCode
        })
    }

    activePack() {
        console.log(this.props.data)
    }

    render() {

        let {data} = this.props;
        const { types, showCode } = this.state;
        return <div className="PackItemComponent">
            <h2>[{types[data.type - 1]}]&nbsp;&nbsp;{data.title}
                <div className='pack-actions'>
                    <Button>加入历史</Button>
                    <Button>加入测试</Button>
                    <Button type="danger">删除</Button>
                    <Button type="primary" onClick={this.activePack}>激活打包</Button>
                </div>
            </h2>
            <div className='app-list'>
                {
                    data.tenants.map(
                        tenant => <div className="app" key={tenant._id}>
                            <img src={tenant.icon?tenant.icon + '?imageView2/5/w/40/h/40':'http://exe.moyufed.com/1545874424004.png' + '?imageView2/5/w/40/h/40'} alt={tenant.appName}/>
                            <p className="app-name">{tenant.appName}</p>
                        </div>
                    )
                }
                {
                    <Highlight className='js'>
                        [{
                        data.tenants.map(tenant => `"${tenant.tenantId}",`)
                    }]
                    </Highlight>
                }
                <div className="pack-code" onClick={this.showCode}>
                    {
                        showCode ? <Icon type="up" /> : <Icon type="down" />
                    }
                </div>
                <QueueAnim type='scale'>
                    {
                        data.note
                            ?
                            <div className="pack-note" key="packNote">
                                <div className="note-header">备注</div>
                                <div className="note-content">{data.note}</div>
                            </div>
                            :null
                    }
                </QueueAnim>
                <div className="pack-count">{data.tenants.length}个租户</div>
            </div>
            <QueueAnim type={['top', 'bottom']}>
                {
                    showCode
                        ?<div key="showCode">
                            <Highlight language="javascript">
                                {
                                    `function selectTenants(tenants) {
    $.each(tenants, function(index, tenantId) {
        $('[value="'+tenantId+'_master"]').prop("checked", true)
    })
    return $('[type="checkbox"]:checked').length
}
selectTenants([${data.tenants.map(tenant => `"${tenant.tenantId}"`)}]);`}</Highlight>
                        </div>:null
                }
            </QueueAnim>
        </div>
    }
};

// 定义PropTypes
PackItemComponent.propTypes = {
    data: PropTypes.object.isRequired
};