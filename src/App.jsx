import React, { Component } from 'react'
import 'antd/dist/reset.css';
// import Login from './components/Login';

import './App.css'
import Dialog from './components/Dialog/Dialog';
// import Home from './components/Home';

export class App extends Component {
  constructor(){
    super()

    this.state={
      temp:{
        key:0,
        num:'default',
        pretext:'无',
        location:'',
        EndPoint:'https://file',
        AccessKeyId:'minioadmin',
        default:true,
      },
      list:[
        {
          key:0,
          num:'default',
          pretext:'无',
          location:'',
          EndPoint:'https://file',
          AccessKeyId:'minioadmin',
          default:true,
        },
        {
          key:1,
          num:'default',
          pretext:'无',
          location:'',
          EndPoint:'https://file.sdlg.cn',
          AccessKeyId:'minio',
          default:true,
        },
        {
          key:2,
          num:'FILE-DEV',
          pretext:'无',
          location:'',
          EndPoint:'https://file.sdlg.cn',
          AccessKeyId:'minioadmin',
          default:false,
        }
      ]
    }
  }
  render() {
    return (
        <div className='App'>
          {/* <div className='leftBox'>左侧盒子</div>
          <div className='rightBox'>
            <Login className="loginForm"/>
          </div> */}
          {/* <Home /> */}
          <Dialog list={this.state.list[0]}/>
        </div>
    )
  }
}

export default App