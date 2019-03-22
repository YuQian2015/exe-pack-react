/**
 * Created by YuQian on 3/21/2019.
 */
import React from 'react';
import {Tooltip, Button, Icon, Modal, Input, message} from 'antd';
import QRCodeComponent from '../../QRCodeComponent.jsx';
import LocalDB from 'local-db';
const exeUserCollection = new LocalDB('exe-user');

import rules from '../rules';
import Html from 'slate-html-serializer';
import $ from "jquery";

const html = new Html({rules});

class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            login: false,
            loginData: null,
            title: ''
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    onLogin(data) {
        exeUserCollection.drop();
        exeUserCollection.insert(data);
        this.setState({
            login: true,
            loginData: data
        });
    }

    handleOk(e) {
        let { loginData } = this.state;
        console.log(loginData);
        let resultHtml = html.serialize(this.props.editor.value);
        console.log(resultHtml)
        const { title } = this.state;
        if(this.state.title) {
            $.ajax({
                timeout: 5000,
                url: `https://t-social.exexm.com/api/social/article/`,
                method: 'POST',
                data: JSON.stringify({
                    article_id: 0, //直接发布传0或不传；将草稿发布为文章时，传草稿id
                    title,
                    cover_image:"article_155316872796748.jpg", //传imageId
                    content: resultHtml,
                    communities:["U002"],
                }),
                contentType: "application/json",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("token", loginData.ticket);
                },
                success: function (result, status, req) {
                    if(result && result.success) {
                        message.success('文章发布成功');
                    }
                },
                error: function (req, error) {
                    message.error(error.msg);
                }

            });
            this.setState({
                visible: false,
            });
        } else {

        }
    }

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {visible, login} = this.state;
        return (
            <div className='toolbar'>
                <div onClick={this.showModal}>
                    <Tooltip title="发布">
                        <Button size="small">发布</Button>
                    </Tooltip>
                </div>
                <Modal
                    title="发布"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okButtonProps={{ disabled: !login || !this.state.title }} >
                    <Input placeholder="请输入文章标题" maxLength={20} type="text" onChange={e => {this.setState({title: e.target.value})}}/>
                    <QRCodeComponent close={!visible} onLogin={this.onLogin} />
                </Modal>
            </div>
        );
    }
}

export default Publish;