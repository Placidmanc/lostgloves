import React, { Component } from 'react'
import PropTypes from 'prop-types';



class FontPicker extends Component{
  constructor(props){
    super(props)
    this.onClickFunc = this.onClickFunc.bind(this)
  }

  onClickFunc(){
    this.props.onClickFn(this.props.parama, this.props.paramb)
  }

  render(){
    return (
      <div className={this.props.classname} onClick={this.onClickFunc} id={this.props.divId}><p>{this.props.label}</p></div>
    )
  }
}

FontPicker.propTypes = {
  classname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  divId: PropTypes.string.isRequired,
  parama: PropTypes.string.isRequired,
  paramb: PropTypes.string.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export default FontPicker;
