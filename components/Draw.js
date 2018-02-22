import React, { Component} from 'react';
import ShortHeader from './ShortHeader';
import 'react-rangeslider/lib/index.css';
import Footer from './Footer';
import { fabric } from 'fabric';
import { Slider } from './common/Slider';
import DivButton from './common/DivButton';
import FontPicker from './common/FontPicker';
import { ChromePicker } from 'react-color';         // https://casesandberg.github.io/react-color/



import fontData from '../data/fontpicker.json';




class Draw extends Component {

  constructor(props){
    super(props)
    this.state = {
      lineheight: 1,
      strokewidth: 0,
      fontsize: 40,
      linewidth: 5,
      canvasWidth: 750,
      fontColor: '#ffffff',
      drawColor: '#ffffff',
      drawColor: '#ffffff',
      displayPenColorPicker: false,
      displayStrokeColorPicker: false,
      displayFontColorPicker: false,
      sizePickerShowing: false,
      lineHeightPickerShowing: false,
      strokeWidthPickerShowing: false,
      fontPickerShowing: false,
      fontSizePickerShowing: false,
      fontData:fontData,
      drawingCanvas:'',
      doodtext:'',
    }
    this.handleColourChangeComplete = this.handleColourChangeComplete.bind(this)
  }


  updateCanvasDimensions() {
    this.setState({
      canvasWidth: 750
    });
    this.dwgCanvas.setHeight(750);
    this.dwgCanvas.setWidth(750);
    this.gloveCanvas.setHeight(750);
    this.gloveCanvas.setWidth(750);
  }

  componentDidMount() {
    this.gloveCanvas = new fabric.Canvas('gloveCanvas');
    this.dwgCanvas = new fabric.Canvas('canvas', {
      width: 750,
      height: 750,
      perPixelTargetFind: true,
  		selection:false,
  		targetFindTolerance:10,
  		enableRetinaScaling: true,
  		isDrawingMode: true,
  		preserveObjectStacking:true,
  		renderOnAddRemove:true
    });
    this.updateCanvasDimensions(this.dwgCanvas);
    this.dwgCanvas.renderAll();
    this.dwgCanvas.freeDrawingBrush.color = '#ffffff';
	  this.dwgCanvas.freeDrawingBrush.width = 5;
  }





  // sliders
  handleLineHeight = (value) => {
    this.setState({
      lineheight: value
    })
  }
  handleStrokeWidth = (value) => {
    this.setState({
      strokewidth: value
    })
  }
  handleFontSize = (value) => {
    this.setState({
      fontsize: value
    })
  }
  handleLineWidth = (value) => {
    this.setState({
      linewidth: value
    })
    this.dwgCanvas.freeDrawingBrush.width = value
  }


  arrange = (string) => {
    console.log('arrange = ' + string)
  }

  toggleDesignObjects = (string) => {
    //
  }

  saveDrawing = (string) => {
    //
  }

  handleTextInput = (e) => {
    this.setState({
      doodtext: e.target.value
    })
  }

  selectFont = (fontName, fontStyle) => {
    console.log('selectFont = ' + fontName)
  }

  textTools = (string) => {
    //
  }

  drawTools = (string) => {
    //
  }

  selectDesignObj = (string) => {
    //
  }


  handleColourClick = (picker) => {
    console.log('picker ' + picker)
    if(picker === "fontColour"){
      this.setState({ displayFontColorPicker: !this.state.displayFontColorPicker })
    }else if(picker === "strokeColour"){
      this.setState({ displayStrokeColorPicker: !this.state.displayStrokeColorPicker })
    }else if(picker === "penColour"){
      this.setState({ displayPenColorPicker: !this.state.displayPenColorPicker })
    }
  }
  handleColourChangeComplete = (color, event) => {
    console.log('handleColourChange ' + color.hex )
    this.dwgCanvas.freeDrawingBrush.color = color.hex
    this.setState({ drawColor: color.hex });
  }
  handleColourClose = () => {
    this.setState({ displayColorPicker: false })
  }


  render() {

    const { lineheight, strokewidth, fontsize, linewidth } = this.state


    return (
      <div>

        <ShortHeader />

            <div className="drawWrapper">
  				      <div className="drawBox">

                  { this.state.displayFontColorPicker ?
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ this.state.fontColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                  <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div> : null
                  }

                  { this.state.displayStrokeColorPicker ?
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ this.state.drawColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                  <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div> : null
                  }

                  { this.state.displayPenColorPicker ?
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ this.state.drawColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                  <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div> : null
                  }

                  <Slider
                    key={1}
                    sliderId="lineheight-container"
                    leftVal={1}
                    rightVal={10}
                    startVal={lineheight}
                    onChangeFn={this.handleLineHeight}
                  />

                  <Slider
                    key={2}
                    sliderId="strokewidth-container"
                    leftVal={0}
                    rightVal={20}
                    startVal={strokewidth}
                    onChangeFn={this.handleStrokeWidth}
                  />

                  <Slider
                    key={3}
                    sliderId="fontsize-container"
                    leftVal={10}
                    rightVal={300}
                    startVal={fontsize}
                    onChangeFn={this.handleFontSize}
                  />

                  <Slider
                    key={4}
                    sliderId="size-container"
                    leftVal={1}
                    rightVal={80}
                    startVal={linewidth}
                    onChangeFn={this.handleLineWidth}
                  />

                  <div id="arrangeMenu">

        						<div className="menuLabel"><p>arrange</p></div>

        						<div id="framesMenuBtns">

                      <DivButton
                        key={1}
                        classname="frameBtnRed"
                        param="clearall"
                        onClickFn={this.arrange}
                        divId="edit-clear"
                        label="clear<br/>all"
                      />

                      <DivButton
                        key={2}
                        classname="frameBtnShort"
                        param="delete"
                        onClickFn={this.arrange}
                        divId="edit-del"
                        label="cut"
                      />

                      <DivButton
                        key={3}
                        classname="frameBtn"
                        param="back"
                        onClickFn={this.arrange}
                        divId="edit-tb"
                        label="to<br/>back"
                      />

                      <DivButton
                        key={4}
                        classname="frameBtn"
                        param="front"
                        onClickFn={this.arrange}
                        divId="edit-tf"
                        label="to<br/>front"
                      />

                      <DivButton
                        key={5}
                        classname="frameBtn"
                        param="moveback"
                        onClickFn={this.arrange}
                        divId="edit-mb"
                        label="move<br/>back"
                      />

                      <DivButton
                        key={6}
                        classname="frameBtn"
                        param="movefront"
                        onClickFn={this.arrange}
                        divId="edit-mf"
                        label="move<br/>front"
                      />

        						</div>
        					</div>


                  <div id="designOjectsMenu">

        						<div className="menuLabel"><p>tools</p></div>

        						<div id="framesMenuBtns">

                        <DivButton
                          key={1}
                          classname="desBtn"
                          param="dr"
                          onClickFn={this.toggleDesignObjects}
                          divId="drbtn"
                          label="draw"
                        />

                        <DivButton
                          key={2}
                          classname="desBtn"
                          param="te"
                          onClickFn={this.toggleDesignObjects}
                          divId="tebtn"
                          label="text"
                        />

                        <DivButton
                          key={3}
                          classname="desBtn"
                          param="st"
                          onClickFn={this.toggleDesignObjects}
                          divId="stbtn"
                          label="stickers"
                        />

                        <DivButton
                          key={4}
                          classname="desBtn"
                          param="ca"
                          onClickFn={this.toggleDesignObjects}
                          divId="cabtn"
                          label="captions"
                        />

                        <DivButton
                          key={5}
                          classname="desBtn"
                          param="ey"
                          onClickFn={this.toggleDesignObjects}
                          divId="eybtn"
                          label="eyes"
                        />

                        <DivButton
                          key={6}
                          classname="desBtn"
                          param="mo"
                          onClickFn={this.toggleDesignObjects}
                          divId="mobtn"
                          label="mouths"
                        />

        						</div>
        					</div>


                  <div id="saveMenu">
                    <DivButton
                      classname="saveBtn"
                      param=""
                      onClickFn={this.saveDrawing}
                      divId="savebtn"
                      label="done"
                    />
        					</div>



                  <div id="font-picker">

                    {this.state.fontData.map((data) =>
                      <FontPicker key={data.id}
                        classname={data.classname}
                        parama={data.param1}
                        paramb={data.param2}
                        onClickFn={this.selectFont}
                        divId={data.divId}
                        label={data.label}
                      />
                    )}

        					</div>



                  <div id="toolsTextMenu">

        						<div className="menuLabel"><p>text</p></div>

        						<div className="text-area-container">
        							<textarea
                        placeholder="Enter text"
                        className="draw-text"
                        ref="doodtext"
                        onChange={this.handleTextInput}
                        ></textarea>
        						</div>

        						<div id="toolsMenuBtnsText">

                        <DivButton
                          key={1}
                          classname="frameBtnLongRed"
                          param="deleteText"
                          onClickFn={this.textTools}
                          divId=""
                          label="clear text"
                        />

                        <DivButton
                          key={2}
                          classname="frameBtnLongGreen"
                          param="add"
                          onClickFn={this.textTools}
                          divId=""
                          label="add text"
                        />

                        <DivButton
                          key={3}
                          classname="frameBtnLong"
                          param="fontfamily"
                          onClickFn={this.textTools}
                          divId="text-family"
                          label="select font"
                        />

                        <DivButton
                          key={4}
                          classname="frameBtnLong"
                          param="size"
                          onClickFn={this.textTools}
                          divId="text-size"
                          label="font size"
                        />

                        <DivButton
                          key={5}
                          classname="toolsBtn"
                          param="bold"
                          onClickFn={this.textTools}
                          divId="text-bold"
                          label="B"
                        />

                        <DivButton
                          key={6}
                          classname="toolsBtn"
                          param="italic"
                          onClickFn={this.textTools}
                          divId="text-italic"
                          label="I"
                        />

                        <DivButton
                          key={7}
                          classname="toolsBtn"
                          param="underline"
                          onClickFn={this.textTools}
                          divId="text-underline"
                          label="U"
                        />

                        <DivButton
                          key={8}
                          classname="toolsBtn"
                          param="alignleft"
                          onClickFn={this.textTools}
                          divId="text-left"
                          label="L"
                        />

                        <DivButton
                          key={9}
                          classname="toolsBtn"
                          param="aligncentre"
                          onClickFn={this.textTools}
                          divId="text-center"
                          label="C"
                        />

                        <DivButton
                          key={10}
                          classname="toolsBtn"
                          param="alignright"
                          onClickFn={this.textTools}
                          divId="text-right"
                          label="R"
                        />

                        <DivButton
                          key={11}
                          classname="frameBtnLong"
                          param="fontColour"
                          onClickFn={this.handleColourClick}
                          divId="fontColBtn"
                          label="colour"
                        />

                        <DivButton
                          key={12}
                          classname="frameBtnLong"
                          param="line"
                          onClickFn={this.textTools}
                          divId="text-height"
                          label="line height"
                        />

                        <DivButton
                          key={13}
                          classname="frameBtnLong"
                          param="strokew"
                          onClickFn={this.textTools}
                          divId="text-stroke"
                          label="stroke width"
                        />

                        <DivButton
                          key={14}
                          classname="frameBtnLong"
                          param="strokeColour"
                          onClickFn={this.handleColourClick}
                          divId="drawColBtn"
                          label="stroke colour"
                        />

        						</div>
        					</div>



                  <div id="toolsDrawMenu">

        						<div className="menuLabel"><p>draw</p></div>

        						<div id="toolsMenuBtnsDraw">

                        <DivButton
                          key={1}
                          classname="frameBtnShort"
                          param="undo"
                          onClickFn={this.drawTools}
                          divId="drawing-undo"
                          label="undo"
                        />

                        <DivButton
                          key={2}
                          classname="frameBtnShort"
                          param="redo"
                          onClickFn={this.drawTools}
                          divId="drawing-redo"
                          label="redo"
                        />

                        <DivButton
                          key={3}
                          classname="frameBtnLong"
                          param="size"
                          onClickFn={this.drawTools}
                          divId="drawing-size"
                          label="pen size"
                        />

                        <DivButton
                          key={4}
                          classname="frameBtnLong"
                          param="penColour"
                          onClickFn={this.handleColourClick}
                          divId="drawColBtn"
                          label="colour"
                        />

        						</div>
        					</div>



                  <div className="desObjectsWrapper">
        						<div id="desObjs">
        							<div className='desBg'>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        								<div className='desObjPicker' onClick={this.selectDesignObj("bg001")}><img className='desObjImg' src='imgs/test-comic.png' alt="" /></div>
        							</div>
        						</div>
        					</div>



                  <div id="designerCanvasWrapper" className="canvas-wrapper" ref="canvas_wrapper" style={{zIndex:2}}>
                    <canvas ref="canvas" id="canvas"></canvas>
                  </div>

                  <div id="gloveCanvasWrapper" className="canvas-wrapper" ref="canvas_bg" style={{zIndex:1}}>
                    <canvas ref="gloveCanvas" id="canvas"></canvas>
                  </div>


                {/**
                  <div id="designerCanvasWrapper" ref="canvas_wrapper">>
        						<canvas id="canvas" width={750} height={750} style={{zIndex:2}}></canvas>
        					</div>

        					<div id="gloveCanvasWrapper">
        						<canvas id="gloveCanvas" width={750} height={750} style={{zIndex:1}}></canvas>
        					</div>
                **/}

              </div>
          </div>

          <Footer />

      </div>
    )
  }
}

export default Draw;
