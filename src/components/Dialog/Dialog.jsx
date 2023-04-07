import { Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import PubSub from 'pubsub-js';


export class Dialog extends Component {
  constructor(props){
    super(props)
    this.state={
      num:'',
      pretext:'',
      EndPoint:'',
      AccessKeyId:'',
      editItem:{},
      isModalOpen: false,
      newData:[]
    }
    this.handleOk = this.handleOk.bind(this)
  }
  //修改后的确认函数
  handleOk(){
    this.setState({
      isModalOpen: false
    })
    console.log(this.props.showData)
    // this.setState({
    //   newData: this.state.newData.map(item => item.key === this.state.tempKey? {...item, ...this.state.showData[0]}: {...item, ...item})
    // },()=>{
    //   console.log(this.state.newData)
    // })
  }
  //修改
  handleChange(e){
    const keyName = e.target.name
    this.setState({
      showData: this.state.showData.map((item, index) => index === 0 ?{...item, [keyName]: e.target.value}: '')
    })
  }
  componentDidMount(){
    this.Show = PubSub.subscribe('isShow',(msg,data)=>{
      this.setState({
        isModalOpen: data
      })
    })
    
    this.Data = PubSub.subscribe('showData',(msg,data)=>{
      this.setState({
        editItem: [...data]
      }, () =>{
        console.log(this.state.editItem)
      })
    })
  }
  componentWillUnmount(){
    // 取消订阅
      PubSub.unsubscribe(this.Show);
      PubSub.unsubscribe(this.Data);
  }
  render(){
    const {isModalOpen} = this.state
    
    const handleCancel = () => {
      this.setState({
        isModalOpen: false
      })
    };
    const handleOk = () => {
      this.setState({
        isModalOpen: false
      })
      console.log(this.props.showData)
      this.setState({
        newData: this.state.newData.map(item => item.key === this.state.tempKey? {...item, ...this.state.showData[0]}: {...item, ...item})
      },()=>{
        console.log(this.state.newData)
      })
    }
    return(
      
      <Modal title="修改数据" open={isModalOpen}  onOk={handleOk} onCancel={handleCancel}>
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
                      placeholder={this.props.showData.num}
                      name='num'
                      value={this.props.showData.num}
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
                      defaultValue={this.props.showData.pretext}
                      name='pretext'
                      value={this.props.showData.pretext}
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
                      defaultValue={this.props.showData.EndPoint}
                      name="EndPoint"
                      value={this.props.showData.EndPoint}
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
                      defaultValue={this.props.showData.AccessKeyId}
                      name="AccessKeyId"
                      value={this.props.showData.AccessKeyId}
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
            
                </Form> 
              </Modal>
  )
  }
    
}

export default Dialog;