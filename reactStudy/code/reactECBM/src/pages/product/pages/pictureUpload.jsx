import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react'
import BaseRoute from '../../../static/router'
import axios from 'axios'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

//上传图片组件
export default class PicturesWall extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    }
    
  }
  baseRoute = BaseRoute.baseRoute
  baseImageRoute = BaseRoute.baseImageRoute
  //隐藏放大镜效果
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      //当图片还没上传时根据base64获取图片
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //获取照片名
  getFileList(){
      return this.state.fileList.map(item => {
          return item.name
      })
  }
  //上传照片
  handleChange = async ({ file,fileList }) => {
      const res = file.response
      console.log(fileList)
      if(file.status === 'done'){
        if(res.status === 0){
            message.success('上传成功')
            const {name, url } = res.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url
        }else{
            message.error('上传失败')
          }
      }
      const name = file.name
      if(file.status === 'removed') {
        const {data:res} = await axios.post('/manage/img/delete',{name})
        if(res.status === 0) {
            message.success('删除成功')
        }else{
            message.error('删除失败')
        }
      }
      this.setState({ fileList })
  };

  componentDidMount(){
    /**
     * uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
     */
    const imgs = this.props.imgs
      if(imgs){
        const fileList = []
        imgs.map((item,index)=>{
          fileList.push({uid:-{index},name:item,url:BaseRoute.baseImageRoute+item})
        })
        this.setState({
          fileList
        })
      }
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={this.baseRoute + '/manage/img/upload'}
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}