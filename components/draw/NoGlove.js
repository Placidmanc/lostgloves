import React from 'react';
import {NavLink} from 'react-router-dom'

const NoGlove = () => {
  return (
    <div className="gloveWarnWrapper">
      <div className="drawLogin">
        <div className="drawLoginHdr">
          <p>You haven't selected a glove to use.</p>
        </div>
        <div className="socialForm">
          <div className="selGloveBtn">
            <NavLink to={'/gloves/'}>select a glove</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoGlove;
