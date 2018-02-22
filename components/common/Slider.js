import React from 'react';
import PropTypes from 'prop-types';
import RangeSlider from 'react-rangeslider'


export const Slider = (props) => {
  return(
    <div id={props.sliderId} className="rSlider">
      <div className="size-left"><p>{props.leftVal}</p></div>
      <div className="range-container"><span className="range-info">{props.startVal}</span>
          <RangeSlider
            min={props.leftVal}
            max={props.rightVal}
            step={1}
            value={props.startVal}
            onChange={props.onChangeFn}
          />
      </div>
      <div className="size-right"><p>{props.rightVal}</p></div>
    </div>
  )
}

Slider.propTypes = {
  sliderId: PropTypes.string.isRequired,
  leftVal: PropTypes.number.isRequired,
  rightVal: PropTypes.number.isRequired,
  startVal: PropTypes.number.isRequired,
  onChangeFn: PropTypes.func.isRequired,
};
