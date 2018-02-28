import React, { Component } from 'react'
import DivButton from './common/DivButton';



class DrawTools extends Component{
  constructor(props){
    super(props)
    this.onClickFunc = this.onClickFunc.bind(this)
  }

  onClickFunc(){
    this.props.onClickFn(this.props.param)
  }

  render(){
    return(
      <div id="toolsDrawMenu">
        <div className="menuLabel"><p>draw</p></div>
        <div id="toolsMenuBtnsDraw">
            <DivButton
              key={1}
              classname="frameBtnShort"
              param="undo"
              onClickFn={this.onClickFunc}
              divId="drawing-undo"
              label="undo"
            />
            <DivButton
              key={2}
              classname="frameBtnShort"
              param="redo"
              onClickFn={this.onClickFunc}
              divId="drawing-redo"
              label="redo"
            />
            <DivButton
              key={3}
              classname="frameBtnLong"
              param="size"
              onClickFn={this.onClickFunc}
              divId="drawing-size"
              label="pen size"
            />
            <DivButton
              key={4}
              classname="frameBtnLong"
              param="penColour"
              onClickFn={this.onClickFunc}
              divId="drawColBtn"
              label="colour"
            />
        </div>
    </div>
    )
  }
}

export default DrawTools;
