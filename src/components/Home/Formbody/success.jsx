import React, { Component } from 'react'
import './Formbody.css'
import data from './data'
import { Table, Popconfirm, Badge, Modal, Form, Input } from 'antd';
import PubSub from 'pubsub-js';


export class Formbody extends Component {
  constructor(){
    super()
    this.state = {
      menueList:['阿里云', '华为云', '本地'],
      isModalOpen: false,
      currentIndex:0,
      data: data,
      tempKey:0,
      newData:[
        {
          key:0,
          num:'default',
          pretext:'无',
          location:'',
          EndPoint:'https://file',
          AccessKeyId:'minio',
          default:true,
      },
      {
          key:1,
          num:'FILE-DEV',
          pretext:'无',
          location:'',
          EndPoint:'https://file.sdlg.cn',
          AccessKeyId:'minioadmin',
          default:false,
      }
      ],
      showData:[{}],
    }
    this.handelActive = this.handelActive.bind(this)
    this.handleOk = this.handleOk.bind(this)
  }
  //点击菜单出现下划线+切换表格
  handelActive(index){
    this.setState({
      currentIndex: index
    })
    const newdata = [...this.state.data]
    let List = newdata[index].list
    this.setState({newData: List})
  }
  //点击删除表格的一行
  handleDelete = (key) => {
    const temp = [...this.state.newData]
    const tempList = temp.filter((item) => item.key !== key);
    this.setState({newData: tempList})
  };
  
  handleFilter(key){
    this.setState({tempKey: key})
    const temp = [...this.state.newData]
    const tempList = temp.filter((item) => item.key === key);
    this.setState({showData: tempList}) 
  }
  // 点击确认
  handleOk(){
    this.setState({
      isModalOpen: false
    })
    console.log(this.state.showData)
    this.setState({
      newData: this.state.newData.map(item => item.key === this.state.tempKey? {...item, ...this.state.showData[0]}: {...item, ...item})
    },()=>{
      console.log(this.state.newData)
    })
  }
    //添加一行数据
  componentDidMount(){
    //  订阅，将订阅的事件取一个名字，当组件卸载的时候进行清除
      this.Token = PubSub.subscribe('newItem',(msg,data)=>{
      // console.log('我是header里面得到的数据',msg,data)
      const temp = [...this.state.newData]
      console.log(typeof this.state.newData)
      // temp['key'] = 
      temp.push(data)
      this.setState({
        newData: temp
      },()=>{
        console.log('添加后的newData是',this.state.newData)
      })
    })
  }

  componentWillUnmount(){
    // 取消订阅
      console.log('卸载',this.Token)
      PubSub.unsubscribe(this.Token);
  }

  //修改
  handleChange(e){
    const keyName = e.target.name
    this.setState({
      showData: this.state.showData.map((item, index) => index === 0 ?{...item, [keyName]: e.target.value}: '')
    })
  }
  render() {
    const { menueList, currentIndex, newData, isModalOpen, showData } = this.state
    const showModal = () => {
      this.setState({
        isModalOpen: true
      })
    };
    
    const handleCancel = () => {
      this.setState({
        isModalOpen: false
      })
    };
    const columns = [
      {
        title: '存储编码',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: '文件名前缀策略',
        dataIndex: 'pretext',
        key: 'pretext',
      },
      {
        title: 'EndPoint',
        dataIndex: 'EndPoint',
        key: 'EndPoint',
      },
      {
        title: 'AccessKeyId',
        dataIndex: 'AccessKeyId',
        key: 'AccessKeyId',
      },
      {
        title: '默认',
        key: 'state',
        render: (_, record) => <Badge status={record.num === 'default'? "success": "error"} 
          text={record.num === 'default'? "是": "否"} />,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) =>
          newData.length >= 1 ? (
            <div>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a>删除</a>
              </Popconfirm>
              <a style={{marginLeft:10}} onClick={() => {showModal();this.handleFilter(record.key)}}>编辑</a>
              <Modal title="修改数据" open={isModalOpen}  onOk={this.handleOk} onCancel={handleCancel} destroyOnClose>
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
                      placeholder={showData[0].num}
                      name='num'
                      value={showData[0].num}
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
                      defaultValue={showData[0].pretext}
                      name='pretext'
                      value={showData[0].pretext}
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
                      defaultValue={showData[0].EndPoint}
                      name="EndPoint"
                      value={showData[0].EndPoint}
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
                      defaultValue={showData[0].AccessKeyId}
                      name="AccessKeyId"
                      value={showData[0].AccessKeyId}
                      onChange={(e) => {this.handleChange(e)}}/>
                  </Form.Item>
            
                </Form>
              </Modal>
            </div>
          ) : null,
      },
    ];
    return (
      <div className='Formcontainer'>
        <div className="menue">
          {menueList.map((item, index) => 
            <div 
              className= {`item ${currentIndex === index ? 'active': ''}`}
              key={index} 
              onClick={() => this.handelActive(index)}>{item}</div>
          )}
        </div>
        <div className='detailContainer'>
          <Table columns={columns} dataSource={newData} />
        </div>
      </div>
    )
  }
}

export default Formbody