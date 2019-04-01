/**
 * Created by PingAn on 3/28/2019.
 */
import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { CONFIG } from '../../../util/Config.jsx';

export default class ImgUploadComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        };
        this.imgCancel = this.imgCancel.bind(this);
        this.imgPreview = this.imgPreview.bind(this);
        this.imgChange = this.imgChange.bind(this);
        this.imgBeforeUpload = this.imgCimgBeforeUploadange.bind(this);
    }

    // 组件将要加载
    componentWillMount() {

    }
    imgCancel(){
        this.setState({ previewVisible: false })
    }

    imgPreview (file) {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    imgChange ({ fileList }){
        this.setState({ fileList })
    }

    // 图片上传前的设置
    imgBeforeUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('请上传JPG图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片必须小于2MB!');
        }
        return isJPG && isLt2M;
    }
  
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const imageLength = 9; // 最多上传图片数量
        const imgPostUrl = CONFIG.imageUrl + '/api/file/image?prefix="richtext"';
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">添加</div>
          </div>
        );
        return (
            <div className="icon-image-select">
                <Upload
                    action={imgPostUrl}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={this.imgBeforeUpload}
                    onPreview={this.imgPreview}
                    onChange={this.imgChange}
                >
                    {fileList.length >= imageLength ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.imgCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}