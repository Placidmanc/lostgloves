import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


class DivButton extends Component{
  constructor(props){
    super(props)
    this.onClickFunc = this.onClickFunc.bind(this)
  }

  onClickFunc(){
    this.props.onClickFn(this.props.param)
  }

  render(){
    return (
      <div className={this.props.classname} onClick={this.onClickFunc} id={this.props.divId}><p>{ReactHtmlParser(this.props.label)}</p></div>
    )
  }
}

DivButton.propTypes = {
  classname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  divId: PropTypes.string,
  onClickFn: PropTypes.func.isRequired,
};

export default DivButton;
