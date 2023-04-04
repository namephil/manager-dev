import React, { Component } from 'react'
import { Button, Modal } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
import './Header.css'

export class Header extends Component {
  constructor(){
    super()

    this.state= {
      isModalOpen: false
    }
  }
  render() {
    const showModal = () => {
      this.setState({
        isModalOpen: true
      })
    };
    const handleOk = () => {
      this.setState({
        isModalOpen: false
      })
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
              <Modal title="创建数据" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>表单区</p>
              </Modal>
            </div>
          </div>
        </div>
        {/* header end */}
      </div>
    )
  }
}

export default Header