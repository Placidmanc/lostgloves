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
      <div
        className={this.props.classname}
        style={ (this.props.currentFont.toLowerCase() === this.props.parama.toLowerCase()) ? {backgroundColor: '#db0f0f'} : { backgroundColor : null }}
        onClick={this.onClickFunc}
        id={this.props.divId}>
        {this.props.label}
      </div>
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
