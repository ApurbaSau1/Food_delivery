import './Sidebar.css'
import React from 'react'
import {assets} from '../../assets/assets.js'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
       </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
       </NavLink>
        <NavLink to="/order" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Order Items</p>
       </NavLink>
        <NavLink to="/addMenu" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Menu</p>
       </NavLink>
        <NavLink to="/listMenu" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Menu</p>
       </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
