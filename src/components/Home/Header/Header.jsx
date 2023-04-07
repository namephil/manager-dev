import React, { Component } from 'react';
import { Button, Form, Input, Modal} from 'antd';
import { UndoOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
import './Header.css';
import PubSub from 'pubsub-js';

export class Header extends Component {
  constructor(){
    super()

    this.state= {
      isModalOpen: false,
      newItem:{
        key:0,
        num:'',
        pretext:'',
        EndPoint:'',
        AccessKeyId:''
      },
      num:'',
      pretext:'',
      EndPoint:'',
      AccessKeyId:''
    }
  }
  handleChange(e){
    const keyName = e.target.name
    this.setState({
      [keyName]: e.target.value
    })
  }
  render() {
    const {isModalOpen, newItem, num, pretext, EndPoint, AccessKeyId} = this.state
    const showModal = () => {
      this.setState({
        isModalOpen: true
      })
    };
    const handleOk = () => {
      this.setState({
        isModalOpen: false
      })
      newItem.num = num
      newItem.pretext = pretext
      newItem.EndPoint = EndPoint
      newItem.AccessKeyId = AccessKeyId
      PubSub.publish('newItem', newItem)
    };
    const handleCancel = () => {
      this.setState({
        isModalOpen: false
      })
    };
    return (
        <div className='Headcontainer'>
        {/* header start */}
        <div className='headerBox'>
          <div className='leftHead'>文件存储配置</div>
          <div className='rightHead'>
            <div className='itemhead'>
              <span>当前租户：</span>
              下拉列表
            </div>
            <div className='itemhead'>
              <Button icon={<UndoOutlined />}>
                刷新
              </Button>
            </div>
            <div className='itemhead'>
              <Button type="primary" onClick={showModal}>
                新建
              </Button>
              {/* 新建模态框start */}
              <Modal title="修改数据" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <Form
                  name="basic"
                  labelCol={{span: 8,}}
                  wrapperCol={{span: 16,}}
                  style={{maxWidth: 600,}}
                  initialValues={{remember: true,}}
                  autoComplete="off"
                >
                  <Form.Item
                    label="存储编码"
                    name="num"
                    rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                    ]}
                  >
                    <Input 
                      name='num'
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
                  <Form.Item
                    label="文件名前缀策略"
                    name="pretext"
                    rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                    ]}
                  >
                    <Input 
                      name='pretext'
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
                  <Form.Item
                    label="EndPoint"
                    name="EndPoint"
                    rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                    ]}
                  >
                    <Input 
                      name="EndPoint"
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
                  <Form.Item
                    label="AccessKeyId"
                    name="AccessKeyId"
                    rules={[
                      {
                        required: true,
                        message: '请输入',
                      },
                    ]}
                  >
                    <Input 
                      name="AccessKeyId"
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
              
                </Form>
              </Modal>
              {/* 新建模态框end */}
            </div>
          </div>
        </div>
        {/* header end */}
      </div>
    )
  }
}

export default Header