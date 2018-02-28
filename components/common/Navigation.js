import React from 'react';
import { NavLink  } from 'react-router-dom'


const Navigation = () => {
  return(
    <div className="menu">
      <ul className="nav-justified">
        <li><NavLink exact activeStyle={{ fontWeight: 300, color: '#2d3b38' }} to="/" >home</NavLink></li>
        <li><NavLink activeStyle={{ fontWeight: 300, color: '#2d3b38' }} to="/gloves">gloves</NavLink></li>
        <li><NavLink activeStyle={{ fontWeight: 300, color: '#2d3b38' }} to="/draw">draw</NavLink></li>
        <li><NavLink activeStyle={{ fontWeight: 300, color: '#2d3b38' }} to="/about">about</NavLink></li>
        <li><NavLink activeStyle={{ fontWeight: 300, color: '#2d3b38' }} to="/sign-in">sign In</NavLink></li>
      </ul>
    </div>
  )
}

export default Navigation;
