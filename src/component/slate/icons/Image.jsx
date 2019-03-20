/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import {Tooltip, Button, Icon, Modal, Input } from 'antd';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            src: ''
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.insertImage = this.insertImage.bind(this);
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    insertImage(editor, src, target) {
        if (target) {
            editor.select(target)
        }
        editor.insertBlock({
            type: 'image',
            data: { src },
        })
    }

    handleOk(e) {
        const { src } = this.state;
        if(src) {
            this.props.editor.command(this.insertImage, src);
            this.setState({
                visible: false,
            });
        }
    }

    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { src, visible } = this.state;
        return (
            <div className='toolbar' >
                <div onClick={this.showModal}>
                    <Tooltip title="插入图片">
                        <Button size="small"><Icon type="picture" /></Button>
                    </Tooltip>
                </div>
                <Modal
                    title="选择图片"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Input type="text" value={src} onChange={e => {this.setState({src: e.target.value})}} placeholder="输入图片URL" />
                </Modal>
            </div>
        );
    }
}

export default Image;