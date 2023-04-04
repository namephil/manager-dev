import React, { Component } from 'react'
import './style.css'
import Header from './Header/Header'
import Formbody from './Formbody/Formbody'

export class Home extends Component {
  
  render() {
    return (
      <div className='container'>
        <div className='header'><Header/></div>
        <div className='body'><Formbody/></div>
      </div>
    )
  }
}

export default Home