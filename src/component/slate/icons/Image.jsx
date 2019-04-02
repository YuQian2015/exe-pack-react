/**
 * Created by YuQian on 3/20/2019.
 */
import React from 'react';
import {Tooltip, Button, Icon, Modal, Input, Radio, Tabs, Alert  } from 'antd';
import ImgUploadComponent from '../image/ImgUpload.jsx';

const exeUserCollection = new LocalDB('exe-user');

const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            tabTypes: 'img',
            radioValue: 'center',
            urlValue:'',
            showImage: false,
            imgList: [],
            child: null
        };
        this.onInitModal = this.onInitModal.bind(this);
        this.imgSave = this.imgSave.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.imgPreview = this.imgPreview.bind(this);
        this.urlEmpty = this.urlEmpty.bind(this);
        this.insertImg = this.insertImg.bind(this);
        this.addImgList = this.addImgList.bind(this);
        this.imgUpload = this.imgUpload.bind(this);
        this.tabsChange = this.tabsChange.bind(this);
    }

    onInitModal () {
        this.setState({ 
            showModal: false,
            tabTypes: 'img',
            radioValue: 'center',
            urlValue:'',
            showImage: false,
            imgList: []
        });
        this.state.child.clearImgList();  // 清空图片选择的内容
    }

    // 获取图片上传组件ref
    imgUpload (ref) {  
        this.setState({child: ref})
    }

    // 添加单张图片
    insertImage (editor, src, target) { 
        if (target) {
            editor.select(target)
        }
        editor.insertBlock({
            type: 'image',
            data: { src, align:this.state.radioValue },
        })
    }

    // 添加多张图片
    addImgList (data){
        this.setState({imgList: data});
    }

    // 插入图片
    insertImg (){
        let {tabTypes} = this.state;
        if(tabTypes == 'url') {
            const { urlValue } = this.state;
            this.props.editor.command(this.insertImage, urlValue);
        }else if(tabTypes == 'img'){
            this.state.imgList.map(item => {
                let currentUrl = '';
                if(item.url){
                    currentUrl = item.url;
                }else if(item.response.success && item.response.data.url){
                    currentUrl = item.response.data.url;
                }
                this.props.editor.command(this.insertImage, currentUrl)
            })
        }
        this.onInitModal(); // 图片添加成功后 需要清除原有状态
    }
    
    // 添加图片操作
    imgSave (e) {
        this.insertImg();
        this.onInitModal();
    }

    // 标签切换
    tabsChange (key){
        this.setState({tabTypes: key});
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
        const { showModal, urlValue, showImage } = this.state;
        const suffix = urlValue ? <Icon type="close-circle" onClick={this.urlEmpty} /> : <span />;
        const query = exeUserCollection.query();
        const user = query && query[0].ticket;
        const alertMessage = "图片要求：小于 2 MB，类型为 JPG。";
        return (
            <div className='toolbar' >
                <div onClick={e => {this.setState({showModal: true})}}>
                    <Tooltip title="插入图片">
                        <Button size="small"><Icon type="picture" /></Button>
                    </Tooltip>
                </div>
                <Modal
                    title="添加图片"
                    visible={showModal}
                    onOk={this.imgSave}
                    onCancel={e => {this.setState({showModal: false})}}
                    okText="添加" cancelText="取消"
                >                        
                    <Alert message={alertMessage} type="warning" closable/>
                    <Tabs defaultActiveKey="img" onChange={this.tabsChange}>

                        <TabPane tab="选择图片" key="img">
                            <RadioGroup onChange= {e => {this.setState({radioValue: e.target.value})}} value={this.state.radioValue}>
                                图片对齐方式：
                                <Radio value={'left'}>左对齐</Radio>
                                <Radio value={'center'}>居中对齐</Radio>
                                <Radio value={'right'}>右对齐</Radio>
                            </RadioGroup>
                            <ImgUploadComponent onRef={this.imgUpload} addImgList={this.addImgList}/>
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