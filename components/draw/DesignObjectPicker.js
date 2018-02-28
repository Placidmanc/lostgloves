import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DesignObject from './DesignObject';


class DesignObjectPicker extends Component{
  constructor(props){
    super(props);
    this.onClickFunc = this.onClickFunc.bind(this);
  }

  onClickFunc = (val) => {
    this.props.onClickFn(val);
  }

  // dataIS = initialState
  createPicker = (dataIS) => {

    if (dataIS.designMode !== "draw" && dataIS.designMode !== "text" ) {
      let md = dataIS.designMode;
      return dataIS.designObjects[dataIS.designMode].elements;
    }
    return [];
  }

  render() {
    return (
      <div>
        {this.createPicker(this.props.data).map(objsArr =>
            <DesignObject
              key={objsArr.id}
              imgObj={objsArr.imgObj}
              onClickFn={this.onClickFunc}
              jpg={objsArr.jpg}
            />
        )}
      </div>
    )
  }
}

DesignObjectPicker.propTypes = {
  data: PropTypes.object.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export default DesignObjectPicker;
