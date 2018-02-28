import React from 'react';
import Navigation from './Navigation';

const Header = (props) => {
  return (<div className="header">

    <div className="socialBarTop">
      <ul className="social">
        <li>
          <a href="draw.html"><img src="assets/imgs/facebook_logo.png" alt=""/></a>
        </li>
        <li>
          <a href="gloves.html"><img src="assets/imgs/twitter_logo.png" alt=""/></a>
        </li>
        <li>
          <a href="about.html"><img src="assets/imgs/google+_logo.png" alt=""/></a>
        </li>
      </ul>
    </div>

    <div className="menuLine"></div>

    <div className="headerWrapper">
      <img src="assets/imgs/lostgloves-logo.png" className="hdrLogo" alt=""/>
      <Navigation active={props.active}/>
    </div>
  </div>)
}

export default Header;
