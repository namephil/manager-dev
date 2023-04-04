import React, { Component } from 'react'
import './Formbody.css'
import data from './data'
import { Table, Popconfirm, Badge, Modal } from 'antd';

export class Formbody extends Component {
  constructor(){
    super()

    this.state = {
      menueList:['阿里云', '华为云', '本地'],
      isModalOpen: false,
      currentIndex:0,
      data: data,
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
      ]
    }
    this.handelActive = this.handelActive.bind(this)
  }
  //点击菜单出现下划线+切换表格
  handelActive(index){
    this.setState({
      currentIndex: index
    })
    const newdata = [...this.state.data]
    let List = newdata[index].list
    this.setState({newData: List})
    console.log(List)
  }
  //点击删除表格的一行
  handleDelete = (key) => {
    const temp = [...this.state.newData]
    const tempList = temp.filter((item) => item.key !== key);
    this.setState({newData: tempList})
    console.log(this.state.newData)
    console.log(key)
  };
  render() {
    const { menueList, currentIndex, newData, isModalOpen } = this.state
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
              <a style={{marginLeft:10}} onClick={showModal}>编辑</a>
              <Modal title="修改数据" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                修改数据
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