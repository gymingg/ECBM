import React from 'react'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import BaseRoute from '../../../static/router.js'

//富文本编辑器，具体用法可看react-draft-wysiwyg官方文档 
export default class RichTextEditor extends React.Component{
  state = {
    editorState:EditorState.createEmpty()
  }
    constructor(props) {
        super(props)
        const html = this.props.detail
        if (html) { // 如果有值, 根据html格式字符串创建一个对应的编辑对象
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
            editorState,
            }
        } else {
            this.state = {
            editorState: EditorState.createEmpty(), // 创建一个没有内容的编辑对象
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        })
    }

    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallBack = (file) => {
      return new Promise(
        (resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', BaseRoute.baseRoute+'/manage/img/upload')
          const data = new FormData()
          data.append('image', file)
          xhr.send(data)
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText)
            const url = response.data.url // 得到图片的url
            resolve({data: {link: url}})
          })
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText)
            reject(error)
          })
        }
      )
    }

    render() {
        const {editorState} = this.state
        return (
          <Editor
            editorState={editorState}
            editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
          />
        )
    }
    
}