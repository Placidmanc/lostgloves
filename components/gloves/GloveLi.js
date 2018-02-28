import React from 'react';
import PropTypes from 'prop-types';
import { NavLink  } from 'react-router-dom'


const fullpath = "/assets/imgs/gloves/";

const GloveLi = ({glove}) => {
  return (
    <li>
      <NavLink to={'/draw/' + glove.imgSrc.split(".")[0]}>
        <div className="glovesHolder"><img src={fullpath + glove.imgSrc} className="glovesImg" alt="" /></div>
      </NavLink>
    </li>
  )
}

GloveLi.propTypes = {
  glove: PropTypes.object.isRequired,
};

export default GloveLi;
