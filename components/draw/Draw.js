import React, { Component} from 'react';
import { fabric } from 'fabric';
import FontFaceObserver from 'fontfaceobserver';
import ShortHeader from '../common/ShortHeader';
import Footer from '../common/Footer';
import DrawingBox from './DrawingBox';
import NoGlove from './NoGlove';

import * as initialState from './initialState';





function splitIncomingURL(path){
  return path.split("/")[2];
}


class Draw extends Component {

  constructor(props){
    super(props)

    this.selectDesignTools = this.selectDesignTools.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.togglePenSizeSlider = this.togglePenSizeSlider.bind(this);
    this.closeSlidersAndPickers = this.closeSlidersAndPickers.bind(this);
    this.addGloveImg = this.addGloveImg.bind(this);
    this.updateStateSlidersAndPickers = this.updateStateSlidersAndPickers.bind(this);
    this.handleColourChangeComplete = this.handleColourChangeComplete.bind(this);
    this.drawTools = this.drawTools.bind(this);
    this.textTools = this.textTools.bind(this);
    this.handlePenWidth = this.handlePenWidth.bind(this);
    this.selectDesignObj = this.selectDesignObj.bind(this);

    this.saveDrawing = this.saveDrawing.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
  }


  // initialise state from external constants
  componentWillMount(){
    this.setState({
      initialState
    })
  }


  // initialise canvasses and load background image
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

    dwgCanvas.freeDrawingBrush.color = this.state.initialState.penColour;
	  dwgCanvas.freeDrawingBrush.width = this.state.initialState.penWidth;

    dwgCanvas.on('selection:cleared', () => {
      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              drawingObjectSelected: false,
          }
      }));
  	});
  	dwgCanvas.on('object:selected', (e) => {
      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              drawingObjectSelected: true,
          }
      }));
  	});
    dwgCanvas.on('mouse:down', (e) => {
  		this.closeSlidersAndPickers();
  	});
  	dwgCanvas.on('mouse:up', (e) => {
  		// if(dwgCanvas.isDrawingMode){
  		// 	saveHistory(getCanvasImg());
  		// }
  	});

    this.drawingCanvas = dwgCanvas;
    this.gloveCanvas = glvCanvas;

    // load initial font ready for use
    this.loadFontAndUse(this.state.initialState.family);

    // check path for glove id
    let glove = splitIncomingURL(this.props.location.pathname);
    if(glove !== undefined){
      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              gloveSelected: true,
              gloveBGImage: glove,
          }
      }))
    }

    // init design objects
    this.initialiseDesignCompsArray();
  }


  // create elements array for each design object
  initialiseDesignCompsArray(){

    const {designObjects} = this.state.initialState;

    for(let obj in designObjects){

      let objsArr = [];
      let count = designObjects[obj].count;
      let path = designObjects[obj].path;
      let pad = "";

      for(let i=1; i<=count; i++){

        if(count < 100){
          if(i<10) pad = "0" + i;
          else pad = i;
        }else{
          if(i<10) pad = "00" + i;
          else if(i<100 && i>=10) pad = "0" + i;
          else pad = i;
        }

        let itemStr = path + "_" + pad;
        let imgObj = `/assets/resources/${path}/png/${itemStr}.png`;
        let jpg = `/assets/resources/${path}/jpg/${itemStr}.jpg`;
        let designObj = {imgObj: imgObj, jpg: jpg, id: i};

        objsArr.push(designObj);
      }

      this.setState((prevState) => ({
        initialState: {
          ...prevState.initialState,
          designObjects: {
            ...prevState.initialState.designObjects,
            [path]: {
              ...prevState.initialState.designObjects[path],
              elements: objsArr
            }
          }
        }
      }));
    };
  }

  // once gloveSelected has been set and components rendered, do something with them
  componentDidUpdate(){

    if (this.state.initialState.gloveSelected) {

      // load background image selected from gloves
      setTimeout(function() {
        this.addGloveImg();
      }.bind(this), 100);

    }
  }


  // control state sliders and colour pickers
  updateStateSlidersAndPickers(pCol, fCol, sCol, pSli, lSli, sSli, fSli){

    this.setState((prevState) => ({
        initialState: {
            ...prevState.initialState,
            penColourPickerShowing: pCol,
            fontColourPickerShowing: fCol,
            strokeColourPickerShowing: sCol,
            drawingPenWidthSliderShowing: pSli,
            textLineHeightSliderShowing: lSli,
            textStrokeWidthSliderShowing: sSli,
            textFontSizeSliderShowing: fSli,
            fontPickerShowing: false,
        }
    }));
  }


  // add background image selected in gloves
  addGloveImg() {

    if(!this.state.initialState.gloveImgLoaded){

      let glove = this.state.initialState.gloveBGImage;
      let that = this;
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

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              gloveImgLoaded: true
          }
      }));
    }
  };


  // make sure sliders and colour pickers close
  closeSlidersAndPickers = () => {
    this.updateStateSlidersAndPickers(false, false, false, false, false, false, false);
  }


  // make button control pen slider visibility
  togglePenSizeSlider = () => {

    var pensize = !this.state.initialState.drawingPenWidthSliderShowing ? true : false;

    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            drawingPenWidthSliderShowing: pensize
        }
    }));
  }


  // make buttons control colour picker visibility
  toggleColorPicker = (picker) => {

    const {fontColourPickerShowing, strokeColourPickerShowing, penColourPickerShowing} = this.state.initialState;

    let showPenColourPicker = false;
    let showStrokeColourPicker = false;
    let showFontColourPicker = false;

    if(picker === "fontcolour"){
      showFontColourPicker = !fontColourPickerShowing;
    }else if(picker === "strokecolour"){
      showStrokeColourPicker = !strokeColourPickerShowing;
    }else if(picker === "pencolour"){
      showPenColourPicker = !penColourPickerShowing;
    }
    this.updateStateSlidersAndPickers(showPenColourPicker, showFontColourPicker, showStrokeColourPicker, false, false, false, false)
  }


  // called from any clicks outside of the colour picker on the canvas
  handleColourClose = () => {
    this.updateStateSlidersAndPickers(false, false, false, false, false, false, false);
  }


  // direct colour from picker
  handleColourChangeComplete = (color, event) => {

    const { designMode, penColourPickerShowing, fontColourPickerShowing, strokeColourPickerShowing, drawingObjectSelected } = this.state.initialState;

    const newcolour = color.hex;

    if(strokeColourPickerShowing){
      this.setState((prevState) => ({
          initialState: {
              ...prevState.initialState,
              strokeColor: color.hex,
          }
      }));
      if(drawingObjectSelected && designMode === "text" && this.drawingCanvas.getActiveObject()){
        this.drawingCanvas.getActiveObject().set("stroke", color.hex);
        this.drawingCanvas.requestRenderAll();
      }
    }

    if(fontColourPickerShowing) {
      this.setState((prevState) => ({
          initialState: {
              ...prevState.initialState,
              colour: color.hex,
          }
      }));
      if(drawingObjectSelected && designMode === "text" && this.drawingCanvas.getActiveObject()){
        this.drawingCanvas.getActiveObject().set("fill", color.hex);
        this.drawingCanvas.requestRenderAll();
      }
    }

    if(penColourPickerShowing){
      this.setState((prevState) => ({
          initialState: {
              ...prevState.initialState,
              penColour: color.hex,
          }
      }));
      this.drawingCanvas.freeDrawingBrush.color = color.hex;
    }
  }


  // swap tools or show design object picker
  selectDesignTools = (string) => {

    console.log("selectDesignTools " + string)

    // close any open sliders and colour pickers
    this.updateStateSlidersAndPickers(false, false, false, false, false, false, false);

    let showDesignTools = false;
    let showTextTools = false;
    let showDesignObjectPicker = this.state.initialState.designObjectPickerShowing;
    this.drawingCanvas.isDrawingMode = false;

    if(string === "draw"){

      showDesignTools = true;
      showDesignObjectPicker = false;
      this.drawingCanvas.isDrawingMode = true;

    }else if(string === "text"){

      showTextTools = true;
      showDesignObjectPicker = false;

    }else{

      // already open - just need to refresh
      if(!showDesignObjectPicker) showDesignObjectPicker = !showDesignObjectPicker;

    }

    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            designMode: string,
            drawingToolsShowing: showDesignTools,
            textToolsShowing: showTextTools,
            designObjectPickerShowing: showDesignObjectPicker,
        }
    }));
  }


  // user input text handler
  handleTextInput = (event) => {

    let value = event.target.value;
    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            doodleText: value,
        }
    }));
  }


  // add user input text to canvas
  addText(){

    const { initialState } = this.state;

    const str = initialState.doodleText;
    let doodleTextItem = null;

    if(str.length > 0){

		    const fw = initialState.bold ? "bold" : "normal";
		    const fs = initialState.italic ? "italic" : "normal";
		    const ul = initialState.underline ? "underline" : "";
		    const scale = 0.5;
		    const pos = 750/2;

		    if (/\s/.test(str)){

    			doodleTextItem = new fabric.Textbox(str, {
    				fontFamily: initialState.family,
            fontSize: initialState.fontSize,
            lineHeight:initialState.lineHeight,
            textDecoration: ul,
            fontWeight: fw,
            fontStyle: fs,
            stroke:initialState.strokeColor,
            strokeWidth: initialState.strokeWidth,
            textAlign:initialState.textAlign,
            fill: initialState.colour,
            hasControls: true,
            hasRotatingPoint:true,
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
    				fontFamily: initialState.family,
            fontSize: initialState.fontSize,
            lineHeight:initialState.lineHeight,
            textDecoration: ul,
            fontWeight: fw,
            fontStyle: fs,
            stroke:initialState.strokeColor,
            strokeWidth: initialState.strokeWidth,
            textAlign:initialState.textAlign,
            fill: initialState.colour,
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
       this.drawingCanvas.setActiveObject(this.drawingCanvas.item(this.drawingCanvas.getObjects().length - 1));
       this.drawingCanvas.renderAll();

		   //objectCounter++;
		   //resetHistory();

	    }
  };


  // handle most of the text tools
  textTools = (string) => {

    this.closeSlidersAndPickers();

    const { initialState } = this.state;

    if(string === "deleteText"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              doodleText: ""
          }
      }));

    }else if(string === "add"){

      this.addText();

    }else if(string === "fontfamily"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              fontPickerShowing: !initialState.fontPickerShowing
          }
      }));

    }else if(string === "fontsize"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              textFontSizeSliderShowing: !initialState.textFontSizeSliderShowing
          }
      }));

    }else if(string === "bold"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              bold: !initialState.bold
          }
      }));

      if(initialState.drawingObjectSelected && initialState.designMode === "text"){
        let weight = (!initialState.bold) ? "bold" : "100";
        this.drawingCanvas.getActiveObject().set("fontWeight", weight);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "italic"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              italic: !initialState.italic
          }
      }));

      if(initialState.drawingObjectSelected && initialState.designMode === "text"){
        let itals = (!initialState.italic) ? "italic" : "normal";
        this.drawingCanvas.getActiveObject().set("fontStyle", itals);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "underline"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              underline: !initialState.underline
          }
      }));

      if(initialState.drawingObjectSelected && initialState.designMode === "text"){
        let underline = (!initialState.underline) ? "underline" : "";
        this.drawingCanvas.getActiveObject().set("underline", underline);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "left" || string === "center" || string === "right"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              textAlign: string
          }
      }));

      if(initialState.drawingObjectSelected && initialState.designMode === "text"){
        this.drawingCanvas.getActiveObject().set("textAlign", string);
        this.drawingCanvas.renderAll();
      }

    }else if(string === "lineheight"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              textLineHeightSliderShowing: !initialState.textLineHeightSliderShowing
          }
      }));

    }else if(string === "strokew"){

      this.setState(prevState => ({
          initialState: {
              ...prevState.initialState,
              textStrokeWidthSliderShowing: !initialState.textStrokeWidthSliderShowing
          }
      }));
    }
  }


  // fonts need to be loaded to be available in Fabric
  loadFontAndUse(font) {

    let that = this;
    let myfont = new FontFaceObserver(font);
    const { initialState } = this.state;

    myfont.load()
      .then(function() {
        if(initialState.drawingObjectSelected && initialState.designMode === "text"){
          that.drawingCanvas.getActiveObject().set("fontFamily", font);
          that.drawingCanvas.requestRenderAll();
        }
      }).catch(function(e) {
        console.log(e)
      });
  }


  // user selected font from picker
  selectFont = (fontName) => {

    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            family: fontName,
        }
    }))
    this.loadFontAndUse(fontName);
  }


  // line height only affects IText objects
  handleLineHeight = (value) => {
    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            lineHeight: value,
        }
    }))
    if(this.state.initialState.drawingObjectSelected && this.state.initialState.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("lineHeight", value);
      this.drawingCanvas.renderAll();
    }
  }


  // set stroke width on text
  handleStrokeWidth = (value) => {
    this.setState(prevState => ({
        initialState: {
          ...prevState.initialState,
          strokeWidth: value,
        }
    }))
    if(this.state.initialState.drawingObjectSelected && this.state.initialState.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("strokeWidth", value);
      this.drawingCanvas.renderAll();
    }
  }


  // set font size!
  handleFontSize = (value) => {
    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            fontSize: value,
        }
    }))
    if(this.state.initialState.drawingObjectSelected && this.state.initialState.designMode === "text"){
      this.drawingCanvas.getActiveObject().set("fontSize", value);
      this.drawingCanvas.renderAll();
    }
  }


  // set pen width
  handlePenWidth = (value) => {
    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            penWidth: value,
        }
    }))
    this.drawingCanvas.freeDrawingBrush.width = value
  }






  clearCanvas = (string) => {
    console.log('clearCanvas = ' + string)
  }

  saveDrawing = (string) => {
    //
  }


  // undo and redo
  drawTools = (string) => {
    console.log("drawTools " + string)
  }


  // image sent from design objects to be added to canvas
  selectDesignObj = (string) => {

    console.log("selectDesignObj " + string)

    let that = this;

    this.setState(prevState => ({
        initialState: {
            ...prevState.initialState,
            designObjectPickerShowing: false,
        }
    }))

    fabric.Image.fromURL(string, function(img){
      img.set({
        hasControls: true,
        hasRotatingPoint:true,
        hasBorders: true,
        cornerSize: 22,
        borderColor:'rgba(0,0,0,0.6)',
        cornerColor :'rgba(0,0,0,0.6)',
        padding:15,
        transparentCorners:false,
      	borderOpacityWhenMoving :0,
      	minScaleLimit:0.02,
      	originX: 'center',
      	originY: 'center',
      	scaleX:0.5,
      	scaleY:0.5,
      	top:375,
      	left:375
      });

      that.drawingCanvas.add(img);
      that.drawingCanvas.setActiveObject(that.drawingCanvas.item(that.drawingCanvas.getObjects().length - 1));
      that.drawingCanvas.renderAll();

      // keep track of number of items added
      //objectCounter++;

      //resetHistory();

    });
  }





  render() {

    // formatters for range sliders
    const formatSliderHandleFixed = value => value.toFixed(2);
    const formatSliderHandleNormal = value => value;


    return (
      <div>

        <ShortHeader />

        { !this.state.initialState.gloveSelected ? <NoGlove /> : null }

        <DrawingBox
          initialState = {this.state.initialState}
          formatSliderHandleFixed = {formatSliderHandleFixed}
          formatSliderHandleNormal = {formatSliderHandleNormal}
          onChangeColorPickerComplete = {this.handleColourChangeComplete}
          onCloseColorPicker = {this.handleColourClose}
          onToggleColorPicker = {this.toggleColorPicker}
          onSelectDesignTools = {this.selectDesignTools}
          onSave = {this.saveDrawing}
          onClear = {this.clearCanvas}
          onSelectFont = {this.selectFont}
          onTogglePenSizeSlider = {this.togglePenSizeSlider}
          onChangeTextInput = {this.handleTextInput}
          onChangeTextTools = {this.textTools}
          onChangeDrawTools = {this.drawTools}
          onChangeTextLineHeight = {this.handleLineHeight}
          onChangeTextStrokeWidth = {this.handleStrokeWidth}
          onChangeTextFontSize = {this.handleFontSize}
          onChangePenSize = {this.handlePenWidth}
          onSelectDesignObject = {this.selectDesignObj}
          onCanvasReady = {this.addGloveImg}
        />

        <Footer />

      </div>
    )
  }
}


export default Draw;
