/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import {Tooltip, Button, Icon, Modal, Input, Radio, Tabs  } from 'antd';
import ImgUploadComponent from '../image/ImgUpload.jsx';
const exeUserCollection = new LocalDB('exe-user');

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            src: '',
            radioValue: 'center',
            urlValue:'',
            showImage: false,
        };
        this.showModal = this.showModal.bind(this);
        this.imgSave = this.imgSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.imgPreview = this.imgPreview.bind(this);
        this.urlEmpty = this.urlEmpty.bind(this);
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

    imgSave(e) {
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

    // 图片对齐方式选择
    radioChange (e) {
        console.log(e.target.value)
        this.setState({
            radioValue: e.target.value,
        })
    }

    // 标签切换
    tabsChange (key){
        console.log(key)
    }

    // URL图片预览
    imgPreview (url) {
        if(!this.state.urlValue){
            Modal.error({
                title: '预览失败',
                content: '请先输入图片URL！',
              });
            return;
        }
        this.setState({
            urlValue: url,
            showImage: true
        })
    }

    // 清除URL输入框内容
    urlEmpty () {
        this.urlInput.focus()
        this.setState({urlValue: '', showImage: false})
    }


    render() {
        const { src, visible, urlValue, showImage } = this.state;
        const suffix = urlValue ? <Icon type="close-circle" onClick={this.urlEmpty} /> : <span />;
        const query = exeUserCollection.query();
        const user = query && query[0].ticket;
        console.log(user)
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
                    onOk={this.imgSave}
                    onCancel={this.handleCancel}
                    okText="保存" cancelText="取消"
                >
                    <Tabs defaultActiveKey="img" onChange={this.tabsChange}>
                        <TabPane tab="选择图片" key="img">
                            <RadioGroup onChange={this.radioChange} value={this.state.radioValue}>
                                <Radio value={'left'}>左对齐</Radio>
                                <Radio value={'center'}>居中对齐</Radio>
                                <Radio value={'right'}>右对齐</Radio>
                            </RadioGroup>
                            <ImgUploadComponent />
                        </TabPane>
                        <TabPane className="icon-image-url" tab="选择URL" key="url">
                            <Input.Search
                                placeholder="输入图片URL"
                                enterButton="预览"
                                onChange={e => {this.setState({urlValue: e.target.value,showImage: false})}}
                                onSearch={this.imgPreview} 
                                value={urlValue}
                                suffix={suffix}
                                ref={node => this.urlInput = node}
                            />
                            {showImage && <img src={urlValue}/>}
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default Image;