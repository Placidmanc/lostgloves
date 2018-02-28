import React, { Component } from 'react'
import PropTypes from 'prop-types';


class DesignObject extends Component{
  constructor(props){
    super(props)
    this.onClickFunc = this.onClickFunc.bind(this)
  }

  onClickFunc(){
    this.props.onClickFn(this.props.imgObj)
  }

  render(){
    return (
      <div className='desObjPicker' onClick={this.onClickFunc}>
        <img className='desObjImg' src={this.props.jpg} />
      </div>
    )
  }
}

DesignObject.propTypes = {
  jpg: PropTypes.string.isRequired,
  imgObj: PropTypes.string.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export default DesignObject;
