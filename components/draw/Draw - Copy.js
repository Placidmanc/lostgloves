import React, { Component} from 'react';
import { fabric } from 'fabric';
import FontFaceObserver from 'fontfaceobserver';
import ShortHeader from '../common/ShortHeader';
import Footer from '../common/Footer';
import DivButton from '../common/DivButton';
import FontPicker from '../common/FontPicker';
import Slider from '../common/Slider';
import { ChromePicker  } from 'react-color';         // https://casesandberg.github.io/react-color/
import 'react-rangeslider/lib/index.css';

import fontData from '../../data/fontpicker.json';




class Draw extends Component {

  constructor(props){
    super(props)
    this.state = {
      textVals: {
        bold:false,
        italic:false,
        underline:false,
        lineHeight:1,
        charSpacing:1,
        fontsize:40,
        colour:"#000",
        textalign:"center",
        family:"gagalin",
        strokeColor:"#fff",
        strokeWidth:0
      },
      linewidth: 5,
      canvasWidth: 750,
      drawColor: '#ffffff',
      tempStrokeColour: '#FFF',
      tempFontColour: '#FFF',
      displayPenColorPicker: false,
      displayStrokeColorPicker: false,
      displayFontColorPicker: false,
      displayPenSizeSlider: false,
      displayLineHeightSlider: false,
      displayStrokeWidthSlider: false,
      displayFontSizeSlider: false,
      displayFontPicker: false,
      displayDrawTools: false,
      displayTextTools: false,
      fontData:fontData,
      doodletext:'',
      designMode: '',
      drawingCanvas: '',
      gloveCanvas: '',
    }
    this.handleColourChangeComplete = this.handleColourChangeComplete.bind(this);
    this.addGloveImg = this.addGloveImg.bind(this);
    this.arrange = this.arrange.bind(this);
    this.toggleDesignObjects = this.toggleDesignObjects.bind(this);
    this.saveDrawing = this.saveDrawing.bind(this);
    this.drawTools = this.drawTools.bind(this);
    this.handleColourClick = this.handleColourClick.bind(this);
    this.textTools = this.textTools.bind(this);
  }


  addGloveImg(){


     let that = this;

     let glove = this.props.location.pathname.split("/")[2];
  	 let imgURL = "/assets/imgs/gloves/" + glove + ".jpg";


     fabric.Image.fromURL(imgURL, function(img){
      	const scale = 1;
      	const pos = 0;
      	img.set({
      		hasRotatingPoint: false,
      		borderOpacityWhenMoving :0,
      		minScaleLimit:0.02,
      		padding:2,
      		transparentCorners:false,
      		originX: 'left',
      		originY: 'top',
      		scaleX:scale,
      		scaleY:scale,
      		top:pos,
      		left:pos,
      		lockScalingFlip: true,
      		lockUniScaling : true
      	});
      	that.gloveCanvas.add(img);
  	 });
  };


  componentDidMount() {
    let glvCanvas = new fabric.Canvas('gcanvas', {
      width: 750,
      height: 750,
      selection:false,
    });
    let dwgCanvas = new fabric.Canvas('canvas', {
      width: 750,
      height: 750,
      perPixelTargetFind: true,
      selection:false,
  		targetFindTolerance:10,
  		enableRetinaScaling: true,
  		isDrawingMode: false,
  		preserveObjectStacking:true,
  		renderOnAddRemove:true,
    });
    //this.updateCanvasDimensions();
    //this.dwgCanvas.renderAll();
    dwgCanvas.freeDrawingBrush.color = this.state.drawColor;
	  dwgCanvas.freeDrawingBrush.width = this.state.linewidth;
    this.drawingCanvas = dwgCanvas;
    this.gloveCanvas = glvCanvas;
    this.loadFontAndUse(this.state.textVals.family);
    this.addGloveImg();
  }






  handleLineHeight = (value) => {
    this.setState(prevState => ({
        textVals: {
            ...prevState.textVals,
            lineHeight: value,
        }
    }))
    if(this.state.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("lineHeight", value);
      this.drawingCanvas.renderAll();
    }
  }


  handleStrokeWidth = (value) => {
    this.setState(prevState => ({
        textVals: {
            ...prevState.textVals,
            strokeWidth: value
        }
    }))
    if(this.state.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("strokeWidth", value);
      this.drawingCanvas.renderAll();
    }
  }


  handleFontSize = (value) => {
    this.setState(prevState => ({
        textVals: {
            ...prevState.textVals,
            fontsize: value,
        }
    }))
    if(this.state.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("fontSize", value);
      this.drawingCanvas.renderAll();
    }
  }


  handleLineWidth = (value) => {
    this.setState({
      linewidth: value
    })
    this.drawingCanvas.freeDrawingBrush.width = value
  }


  arrange = (string) => {
    console.log('arrange = ' + string)
  }


  toggleDesignObjects = (string) => {

    console.log("toggleDesignObjects " + string)

    this.drawingCanvas.isDrawingMode = false;

    if(string === "draw"){
      this.setState({
        designMode: string,
        displayDrawTools: true,
        displayTextTools: false,
      })

      this.drawingCanvas.isDrawingMode = true;

    }else if(string === "text"){
      this.setState({
        designMode: string,
        displayDrawTools: false,
        displayTextTools: true,
      })
    }else{
      this.setState({
        designMode: string,
        displayDrawTools: false,
        displayTextTools: false,
      })
    }
  }


  saveDrawing = (string) => {
    //
  }


  addText(){

    const { doodletext, textVals } = this.state;

    const str = doodletext;
    let doodleTextItem = null;

    if(str.length > 0){

		    const fw = textVals.bold ? "bold" : "normal";
		    const fs = textVals.italic ? "italic" : "normal";
		    const ul = textVals.underline ? "underline" : "";
		    const scale = 0.5;
		    const pos = 750/2;

		    if (/\s/.test(str)){

    			doodleTextItem = new fabric.Textbox(str, {
    				fontFamily: textVals.family,
            fontSize: textVals.fontsize,
            lineHeight:textVals.lineHeight,
            textDecoration: ul,
            fontWeight: fw,
            fontStyle: fs,
            stroke:textVals.strokeColor,
            strokeWidth: textVals.strokeWidth,
            textAlign:textVals.textalign,
            fill: textVals.colour,
            hasControls: true,
            hasRotatingPoint:false,
            hasBorders: true,
            cornerSize: 22,
            borderColor:'rgba(0,0,0,0.6)',
            cornerColor :'rgba(0,0,0,0.6)',
            padding:15,
            transparentCorners:false,
            originX:'center',
            originY: 'center',
            top:pos,
            left:pos
    			});

		   }else{

    			doodleTextItem = new fabric.Text(str, {
    				fontFamily: textVals.family,
            fontSize: textVals.fontsize,
            lineHeight:textVals.lineHeight,
            textDecoration: ul,
            fontWeight: fw,
            fontStyle: fs,
            stroke:textVals.strokeColor,
            strokeWidth: textVals.strokeWidth,
            textAlign:textVals.textalign,
            fill: textVals.colour,
            hasControls: true,
            hasRotatingPoint:true,
            hasBorders: true,
            cornerSize: 22,
            borderColor:'rgba(0,0,0,0.6)',
            cornerColor :'rgba(0,0,0,0.6)',
            minScaleLimit:0.02,
            padding:15,
            transparentCorners:false,
            originX: 'center',
            originY: 'center',
            scaleX:scale,
            scaleY:scale,
            top:pos,
            left:pos
    			});
		   }

		   this.drawingCanvas.add(doodleTextItem);
       this.drawingCanvas.renderAll();

		   const selected = this.drawingCanvas.setActiveObject(this.drawingCanvas.item(this.drawingCanvas.getObjects().length - 1));

		   //objectCounter++;
		   //resetHistory();

	    }
  };


  handleTextInput = (e) => {
    this.setState({
      doodletext: e.target.value
    })
  }


  selectFont = (fontName) => {
    console.log('selectFont = ' + fontName)
    this.setState(prevState => ({
        textVals: {
            ...prevState.textVals,
            family: fontName,
        }
    }))
    this.setState({
      displayFontPicker: false,
    })
    this.loadFontAndUse(fontName);
  }


  loadFontAndUse(font) {

    let that = this;
    let myfont = new FontFaceObserver(font)
    const { designMode } = this.state

    myfont.load()
      .then(function() {
        if(designMode === "text"){
          that.drawingCanvas.getActiveObject().set("fontFamily", font);
          that.drawingCanvas.requestRenderAll();
        }
      }).catch(function(e) {
        console.log(e)
      });
  }


  textTools = (string) => {
    //console.log("textTools " + string)

    if(string === "deleteText"){

      this.setState({ doodletext: "", })
      this.refs.doodleText.value = "";

    }else if(string === "add"){

      this.addText();

    }else if(string === "fontfamily"){

      this.setState({ displayFontPicker: true, })

    }else if(string === "fontsize"){

      var fontsize = (string === "fontsize" && !this.state.displayFontSizeSlider) ? true : false;
      this.setState({ displayFontSizeSlider: fontsize, })

    }else if(string === "bold"){

      this.setState(prevState => ({
          textVals: {
              ...prevState.textVals,
              bold: !prevState.textVals.bold,
          }
      }))
      if(this.state.designMode === "text"){
        let weight = (!this.state.textVals.bold) ? "bold" : "100";
        this.drawingCanvas.getActiveObject().set("fontWeight", weight);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "italic"){

      this.setState(prevState => ({
          textVals: {
              ...prevState.textVals,
              italic: !prevState.textVals.italic,
          }
      }))
      if(this.state.designMode === "text"){
        let itals = (!this.state.textVals.italic) ? "italic" : "normal";
        this.drawingCanvas.getActiveObject().set("fontStyle", itals);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "underline"){

      this.setState(prevState => ({
          textVals: {
              ...prevState.textVals,
              underline: !prevState.textVals.underline,
          }
      }))
      if(this.state.designMode === "text"){
        let underline = (!this.state.textVals.underline) ? "underline" : "";
        this.drawingCanvas.getActiveObject().set("underline", underline);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "left" || string === "center" || string === "right"){

      this.setState(prevState => ({
          textVals: {
              ...prevState.textVals,
              textalign: string,
          }
      }))
      if(this.state.designMode === "text"){
        this.drawingCanvas.getActiveObject().set("textAlign", string);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "lineheight"){

      var lineheight = (string === "lineheight" && !this.state.displayLineHeightSlider) ? true : false;
      this.setState({ displayLineHeightSlider: lineheight, })

    }else if(string === "strokew"){

      var strokew = (string === "strokew" && !this.state.displayStrokeWidthSlider) ? true : false;
      this.setState({ displayStrokeWidthSlider: strokew, })

    }
  }





  drawTools = (string) => {
    console.log("drawTools " +string)

    // var undo = (string === "undo") ? true : false;
    // var redo = (string === "redo") ? true : false;
    var pensize = (string === "pensize" && !this.state.displayPenSizeSlider) ? true : false;
    this.setState({ displayPenSizeSlider: pensize, })
  }



  selectDesignObj = (string) => {
    //
  }


  handleColourClick = (picker) => {

    //console.log('picker ' + picker)

    if(picker === "fontcolour"){
      this.setState({
        displayFontColorPicker: !this.state.displayFontColorPicker,
        displayStrokeColorPicker: false,
        displayPenColorPicker: false,
      })
    }else if(picker === "strokecolour"){
      this.setState({
        displayStrokeColorPicker: !this.state.displayStrokeColorPicker,
        displayFontColorPicker: false,
        displayPenColorPicker: false,
      })
    }else if(picker === "pencolour"){
      this.setState({
        displayPenColorPicker: !this.state.displayPenColorPicker,
        displayFontColorPicker: false,
        displayStrokeColorPicker: false,
      })
    }
  }

  handleColourChangeComplete = (color, event) => {
    //console.log('handleColourChange ' + color.hex )


    const { designMode, displayFontColorPicker, displayStrokeColorPicker, displayPenColorPicker } = this.state;
    let newcolour = color.hex;

    console.log('newcolour ' + newcolour )

    if(displayStrokeColorPicker){

      this.setState({ tempStrokeColour: color.hex });

      if(designMode === "text" && this.drawingCanvas.getActiveObject()){
        this.drawingCanvas.getActiveObject().set("stroke", color.hex);
        this.drawingCanvas.requestRenderAll();
      }
    }
    if(displayPenColorPicker){

      this.setState({ drawColor: color.hex });

      this.drawingCanvas.freeDrawingBrush.color = color.hex;
    }
    if(displayFontColorPicker) {

      this.setState({ tempFontColour: color.hex });

      if(designMode === "text" && this.drawingCanvas.getActiveObject()){
        this.drawingCanvas.getActiveObject().set("fill", color.hex);
        this.drawingCanvas.requestRenderAll();
      }
    }
  }

  handleColourClose = () => {
    if(this.state.displayFontColorPicker) this.setState({ displayFontColorPicker: false })
    if(this.state.displayStrokeColorPicker) this.setState({ displayStrokeColorPicker: false })
    if(this.state.displayPenColorPicker) this.setState({ displayPenColorPicker: false })
  }


  render() {

    const { lineHeight, strokeWidth, fontsize } = this.state.textVals
    const { linewidth, fontColor, drawColor, strokeColor } = this.state

    // formatters for range sliders
    const formatHandle = value => value.toFixed(2);
    const formatNull = value => value;



    return (
      <div>

        <ShortHeader />

            <div className="drawWrapper">
  				      <div className="drawBox">

                  { this.state.displayFontColorPicker &&
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ fontColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                    <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div>
                  }

                  { this.state.displayStrokeColorPicker &&
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ strokeColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                    <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div>
                  }

                  { this.state.displayPenColorPicker &&
                    <div className="colourPickerPopup">
                    <ChromePicker
                      color={ drawColor }
                      onChangeComplete={ this.handleColourChangeComplete }
                    />
                    <div className="colourPickerWrapper" onClick={ this.handleColourClose }/></div>
                  }




                  { this.state.displayLineHeightSlider &&
                    <Slider
                      key={1}
                      sliderId="lineheight-container"
                      leftVal={0.1}
                      rightVal={2.0}
                      startVal={lineHeight}
                      step={0.1}
                      format={formatHandle}
                      onChangeFn={this.handleLineHeight}
                    />
                  }

                  { this.state.displayStrokeWidthSlider &&
                    <Slider
                      key={2}
                      sliderId="strokewidth-container"
                      leftVal={0}
                      rightVal={20}
                      startVal={strokeWidth}
                      step={1}
                      format={formatNull}
                      onChangeFn={this.handleStrokeWidth}
                    />
                  }

                  { this.state.displayFontSizeSlider &&
                    <Slider
                      key={3}
                      sliderId="fontsize-container"
                      leftVal={10}
                      rightVal={300}
                      startVal={fontsize}
                      step={1}
                      format={formatNull}
                      onChangeFn={this.handleFontSize}
                    />
                  }

                  { this.state.displayPenSizeSlider &&
                    <Slider
                      key={4}
                      sliderId="size-container"
                      leftVal={1}
                      rightVal={80}
                      startVal={linewidth}
                      step={1}
                      format={formatNull}
                      onChangeFn={this.handleLineWidth}
                    />
                  }

                  <div id="arrangeMenu">
                    <DivButton
                      classname="saveBtn"
                      param="clearall"
                      onClickFn={this.arrange}
                      divId="savebtn"
                      label="clear all"
                    />
        					</div>

                  {/* <div id="arrangeMenu">

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
        					</div> */}


                  <div id="designOjectsMenu">

        						<div className="menuLabel"><p>tools</p></div>

        						<div id="framesMenuBtns">

                        <DivButton
                          key={1}
                          classname="desBtn"
                          param="draw"
                          onClickFn={this.toggleDesignObjects}
                          divId="drbtn"
                          label="draw"
                        />

                        <DivButton
                          key={2}
                          classname="desBtn"
                          param="text"
                          onClickFn={this.toggleDesignObjects}
                          divId="tebtn"
                          label="text"
                        />

                        <DivButton
                          key={3}
                          classname="desBtn"
                          param="stickers"
                          onClickFn={this.toggleDesignObjects}
                          divId="stbtn"
                          label="stickers"
                        />

                        <DivButton
                          key={4}
                          classname="desBtn"
                          param="captions"
                          onClickFn={this.toggleDesignObjects}
                          divId="cabtn"
                          label="captions"
                        />

                        <DivButton
                          key={5}
                          classname="desBtn"
                          param="eyes"
                          onClickFn={this.toggleDesignObjects}
                          divId="eybtn"
                          label="eyes"
                        />

                        <DivButton
                          key={6}
                          classname="desBtn"
                          param="mouths"
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


                  { this.state.displayFontPicker &&

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
                  }



                  { this.state.displayDrawTools &&

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
                            param="pensize"
                            onClickFn={this.drawTools}
                            divId="drawing-size"
                            label="pen size"
                          />
                          <DivButton
                            key={4}
                            classname="frameBtnLong"
                            param="pencolour"
                            onClickFn={this.handleColourClick}
                            divId="drawColBtn"
                            label="colour"
                          />
                      </div>
                    </div>
                  }


                  { this.state.displayTextTools &&

                      <div id="toolsTextMenu">
                          <div className="menuLabel"><p>text</p></div>
                          <div className="text-area-container">
                            <textarea
                              placeholder="Enter text"
                              className="draw-text"
                              ref="doodleText"
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
                              param="fontsize"
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
                              param="left"
                              onClickFn={this.textTools}
                              divId="text-left"
                              label="L"
                            />
                            <DivButton
                              key={9}
                              classname="toolsBtn"
                              param="center"
                              onClickFn={this.textTools}
                              divId="text-center"
                              label="C"
                            />
                            <DivButton
                              key={10}
                              classname="toolsBtn"
                              param="right"
                              onClickFn={this.textTools}
                              divId="text-right"
                              label="R"
                            />
                            <DivButton
                              key={11}
                              classname="frameBtnLong"
                              param="fontcolour"
                              onClickFn={this.handleColourClick}
                              divId="fontColBtn"
                              label="colour"
                            />
                            <DivButton
                              key={12}
                              classname="frameBtnLong"
                              param="lineheight"
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
                              param="strokecolour"
                              onClickFn={this.handleColourClick}
                              divId="drawColBtn"
                              label="stroke colour"
                            />
                          </div>
                      </div>
                  }



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
                    <canvas ref="gloveCanvas" id="gcanvas"></canvas>
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
