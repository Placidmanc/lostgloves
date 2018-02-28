import React from 'react';
import { Link } from 'react-router-dom'


const FooterNavigation = () => {
  return(
    <div className="footerMenu">
      <ul className="nav-footer">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/gloves">Gloves</Link></li>
        <li><Link to="/draw">Draw</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/sign-in">Sign In</Link></li>
      </ul>
    </div>
  )
}

export default FooterNavigation;
