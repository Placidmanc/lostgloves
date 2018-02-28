import React from 'react';
import PropTypes from 'prop-types';
import RangeSlider from 'react-rangeslider'


const Slider = ({sliderId, leftVal, rightVal, startVal, step, format, onChangeFn }) => {
  return(
    <div id={sliderId} className="rSlider">
      <div className="size-left"><p>{leftVal}</p></div>
      <div className="range-container"><span className="range-info">{startVal.toFixed(0)}</span>
          <RangeSlider
            min={leftVal}
            max={rightVal}
            step={step}
            value={startVal}
            format={format}
            onChange={onChangeFn}
          />
      </div>
      <div className="size-right"><p>{rightVal}</p></div>
    </div>
  )
}

Slider.propTypes = {
  sliderId: PropTypes.string.isRequired,
  leftVal: PropTypes.number.isRequired,
  rightVal: PropTypes.number.isRequired,
  startVal: PropTypes.number,
  step: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
  onChangeFn: PropTypes.func.isRequired,
};

export default Slider;
