import React from 'react'
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import './style.css'


export default function Login() {
    const handleLogin = () =>{
      console.log('点击登录了')
    }
    return (
        <Form
        className='basic'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
        className='item username'
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username" />
        </Form.Item>
    
        <Form.Item
        className='item password'
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </Form.Item>
    
        <Form.Item
        className='item loginbtn'
        >
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={() => handleLogin()}>
            登录
          </Button>
        </Form.Item>
        <Form.Item
          className='item forgetbtn'
        >
          <span style={{color:'lightgray'}}>
            忘记密码
          </span>
        </Form.Item>
      </Form>
    )
  
}