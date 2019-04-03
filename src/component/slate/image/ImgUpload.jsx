/**
 * Created by PingAn on 3/28/2019.
 */
import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import { CONFIG } from '../../../util/Config.jsx';
const exeUserCollection = new LocalDB('exe-user');

export default class ImgUploadComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            token: ''
        };
        this.imgCancel = this.imgCancel.bind(this);
        this.imgPreview = this.imgPreview.bind(this);
        this.imgChange = this.imgChange.bind(this);
        this.imgBeforeUpload = this.imgBeforeUpload.bind(this);
        this.addImgList = this.addImgList.bind(this);
        this.isLogin = this.isLogin.bind(this);
    }

    // 组件将要加载
    componentWillMount() {
      this.isLogin();
    }
    componentDidMount(){
      //必须在这里声明，所以 ref 回调可以引用它
      this.props.onRef(this)
    }

    isLogin(){
      const query = exeUserCollection.query();
      const user  = query && query[0] && query[0].ticket;
      if(user){
        this.setState({ token : user })
      }else{
        Modal.error({
          title: '上传失败',
          content: '请先登录帐号！',
        });
        return;
      }
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
      this.addImgList(fileList);
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
  
 
    addImgList(){
        //调用父组件的方法修改父组件的内容
        this.props.addImgList(this.state.fileList);
    }

    clearImgList (){
      this.setState({fileList: []})
    }

    render() {
        const { previewVisible, previewImage, fileList, token } = this.state;
        const imageLength = 9; // 最多上传图片数量
        const imgPostUrl = CONFIG.imageUrl + '/api/file/image?prefix=richtext';
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">添加</div>
          </div>
        );
        const props = {
          action: imgPostUrl,
          // customRequest: this.postImage,
          headers: { token },
          listType: "picture-card",
          fileList: fileList,
          beforeUpload: this.imgBeforeUpload,
          onPreview: this.imgPreview,
          onChange: this.imgChange,
        }
        return (
            <div className="icon-image-select">
                <Upload {...props}>
                    {fileList.length >= imageLength ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.imgCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}