import React, { Component } from 'react';
import DivButton from './DivButton';
import FontPicker from './FontPicker';
import DesignObjectPicker from './DesignObjectPicker';
import Slider from './Slider';
import { ChromePicker  } from 'react-color';         // https://casesandberg.github.io/react-color/
import 'react-rangeslider/lib/index.css';
import fontData from '../../data/fontpicker.json';



class DrawingBox extends Component {


  render() {

    const {
      initialState,
      formatSliderHandleFixed,
      formatSliderHandleNormal,
      onChangeColorPickerComplete,
      onCloseColorPicker,
      onToggleColorPicker,
      onSelectDesignTools,
      onSave,
      onClear,
      onSelectFont,
      onTogglePenSizeSlider,
      onChangeTextInput,
      onChangeTextTools,
      onChangeDrawTools,
      onChangeTextLineHeight,
      onChangeTextStrokeWidth,
      onChangeTextFontSize,
      onChangePenSize,
      onSelectDesignObject
    } = this.props;

    return (
      <div className="drawWrapper">
          <div className="drawBox">


            { initialState.fontColourPickerShowing &&
              <div className="colourPickerPopup">
                <ChromePicker
                  color={initialState.colour}
                  onChangeComplete={onChangeColorPickerComplete}
                />
                <div className="colourPickerWrapper" onClick={onCloseColorPicker}/>
              </div>
            }


            { initialState.strokeColourPickerShowing &&
              <div className="colourPickerPopup">
                <ChromePicker
                  color={initialState.strokeColor}
                  onChangeComplete={onChangeColorPickerComplete}
                />
                <div className="colourPickerWrapper" onClick={onCloseColorPicker}/>
              </div>
            }


            { initialState.penColourPickerShowing &&
              <div className="colourPickerPopup">
                <ChromePicker
                  color={initialState.penColour}
                  onChangeComplete={onChangeColorPickerComplete}
                />
                <div className="colourPickerWrapper" onClick={onCloseColorPicker}/>
              </div>
            }




            { initialState.textLineHeightSliderShowing &&
              <Slider
                key={1}
                sliderId="lineheight-container"
                leftVal={0.1}
                rightVal={2.0}
                startVal={initialState.lineHeight}
                step={0.1}
                format={formatSliderHandleFixed}
                onChangeFn={onChangeTextLineHeight}
              />
            }

            { initialState.textStrokeWidthSliderShowing &&
              <Slider
                key={2}
                sliderId="strokewidth-container"
                leftVal={0}
                rightVal={20}
                startVal={initialState.strokeWidth}
                step={1}
                format={formatSliderHandleNormal}
                onChangeFn={onChangeTextStrokeWidth}
              />
            }

            { initialState.textFontSizeSliderShowing &&
              <Slider
                key={3}
                sliderId="fontsize-container"
                leftVal={10}
                rightVal={300}
                startVal={initialState.fontSize}
                step={1}
                format={formatSliderHandleNormal}
                onChangeFn={onChangeTextFontSize}
              />
            }

            { initialState.drawingPenWidthSliderShowing &&
              <Slider
                key={4}
                sliderId="size-container"
                leftVal={1}
                rightVal={80}
                startVal={initialState.penWidth}
                step={1}
                format={formatSliderHandleNormal}
                onChangeFn={onChangePenSize}
              />
            }

            <div id="arrangeMenu">
              <DivButton
                classname="saveBtn"
                param="clearall"
                onClickFn={onClear}
                divId="savebtn"
                label="clear all"
              />
            </div>


            <div id="designOjectsMenu">

              <div className="menuLabel"><p>tools</p></div>

              <div id="framesMenuBtns">

                  <DivButton
                    key={1}
                    classname="desBtn"
                    param="draw"
                    onClickFn={onSelectDesignTools}
                    divId="drbtn"
                    label="draw"
                  />

                  <DivButton
                    key={2}
                    classname="desBtn"
                    param="text"
                    onClickFn={onSelectDesignTools}
                    divId="tebtn"
                    label="text"
                  />

                  <DivButton
                    key={3}
                    classname="desBtn"
                    param="stickers"
                    onClickFn={onSelectDesignTools}
                    divId="stbtn"
                    label="stickers"
                  />

                  <DivButton
                    key={4}
                    classname="desBtn"
                    param="cap"
                    onClickFn={onSelectDesignTools}
                    divId="cabtn"
                    label="captions"
                  />

                  <DivButton
                    key={5}
                    classname="desBtn"
                    param="eyes"
                    onClickFn={onSelectDesignTools}
                    divId="eybtn"
                    label="eyes"
                  />

                  <DivButton
                    key={6}
                    classname="desBtn"
                    param="mouth"
                    onClickFn={onSelectDesignTools}
                    divId="mobtn"
                    label="mouths"
                  />

              </div>
            </div>


            <div id="saveMenu">
              <DivButton
                classname="saveBtn"
                param=""
                onClickFn={onSave}
                divId="savebtn"
                label="done"
              />
            </div>


            { initialState.fontPickerShowing &&

              <div id="font-picker">

                {fontData.map((data) =>
                  <FontPicker key={data.id}
                    classname={data.classname}
                    parama={data.param1}
                    paramb={data.param2}
                    currentFont={initialState.family}
                    onClickFn={onSelectFont}
                    divId={data.divId}
                    label={data.label}
                  />
                )}

              </div>
            }



            { initialState.drawingToolsShowing &&

              <div id="toolsDrawMenu">

                <div className="menuLabel"><p>draw</p></div>

                <div id="toolsMenuBtnsDraw">

                    <DivButton
                      key={1}
                      classname="frameBtnShort"
                      param="undo"
                      onClickFn={onChangeDrawTools}
                      divId="drawing-undo"
                      label="undo"
                    />
                    <DivButton
                      key={2}
                      classname="frameBtnShort"
                      param="redo"
                      onClickFn={onChangeDrawTools}
                      divId="drawing-redo"
                      label="redo"
                    />

                    <DivButton
                      key={3}
                      classname="frameBtnLong"
                      param="pensize"
                      onClickFn={onTogglePenSizeSlider}
                      divId="drawing-size"
                      label="pen size"
                    />

                    <DivButton
                      key={4}
                      classname="frameBtnLong"
                      param="pencolour"
                      onClickFn={onToggleColorPicker}
                      divId="drawColBtn"
                      label="colour"
                    />

                </div>
              </div>
            }


            { initialState.textToolsShowing &&

                <div id="toolsTextMenu">

                    <div className="menuLabel"><p>text</p></div>

                    <div className="text-area-container">

                      <textarea
                        placeholder="Enter text"
                        className="draw-text"
                        value={initialState.doodleText}
                        onChange={onChangeTextInput}
                        ></textarea>
                    </div>

                    <div id="toolsMenuBtnsText">

                      <DivButton
                        key={1}
                        classname="frameBtnLongRed"
                        param="deleteText"
                        onClickFn={onChangeTextTools}
                        divId=""
                        label="clear text"
                      />

                      <DivButton
                        key={2}
                        classname="frameBtnLongGreen"
                        param="add"
                        onClickFn={onChangeTextTools}
                        divId=""
                        label="add text"
                      />

                      <DivButton
                        key={3}
                        classname="frameBtnLong"
                        param="fontfamily"
                        onClickFn={onChangeTextTools}
                        divId="text-family"
                        label="select font"
                      />

                      <DivButton
                        key={4}
                        classname="frameBtnLong"
                        param="fontsize"
                        onClickFn={onChangeTextTools}
                        divId="text-size"
                        label="font size"
                      />

                      <DivButton
                        key={5}
                        classname="toolsBtn"
                        param="bold"
                        onClickFn={onChangeTextTools}
                        divId="text-bold"
                        label="B"
                      />

                      <DivButton
                        key={6}
                        classname="toolsBtn"
                        param="italic"
                        onClickFn={onChangeTextTools}
                        divId="text-italic"
                        label="I"
                      />

                      <DivButton
                        key={7}
                        classname="toolsBtn"
                        param="underline"
                        onClickFn={onChangeTextTools}
                        divId="text-underline"
                        label="U"
                      />

                      <DivButton
                        key={8}
                        classname="toolsBtn"
                        param="left"
                        onClickFn={onChangeTextTools}
                        divId="text-left"
                        label="L"
                      />

                      <DivButton
                        key={9}
                        classname="toolsBtn"
                        param="center"
                        onClickFn={onChangeTextTools}
                        divId="text-center"
                        label="C"
                      />

                      <DivButton
                        key={10}
                        classname="toolsBtn"
                        param="right"
                        onClickFn={onChangeTextTools}
                        divId="text-right"
                        label="R"
                      />

                      <DivButton
                        key={11}
                        classname="frameBtnLong"
                        param="fontcolour"
                        onClickFn={onToggleColorPicker}
                        divId="fontColBtn"
                        label="colour"
                      />

                      <DivButton
                        key={12}
                        classname="frameBtnLong"
                        param="lineheight"
                        onClickFn={onChangeTextTools}
                        divId="text-height"
                        label="line height"
                      />

                      <DivButton
                        key={13}
                        classname="frameBtnLong"
                        param="strokew"
                        onClickFn={onChangeTextTools}
                        divId="text-stroke"
                        label="stroke width"
                      />

                      <DivButton
                        key={14}
                        classname="frameBtnLong"
                        param="strokecolour"
                        onClickFn={onToggleColorPicker}
                        divId="drawColBtn"
                        label="stroke colour"
                      />

                    </div>
                </div>
            }


            { initialState.designObjectPickerShowing &&

              <div className="desObjectsWrapper">
                <div id="desObjs">
                  <div className='desBg'>

                      <DesignObjectPicker
                        data={initialState}
                        onClickFn={onSelectDesignObject}
                      />

                  </div>
                </div>
              </div>
            }



            <div id="designerCanvasWrapper" className="canvas-wrapper" ref="canvas_wrapper" style={{zIndex:2}}>
              <canvas ref="canvas" id="canvas"></canvas>
            </div>

            <div id="gloveCanvasWrapper" className="canvas-wrapper" ref="canvas_bg" style={{zIndex:1}}>
              <canvas ref="gloveCanvas" id="gcanvas"></canvas>
            </div>

          </div>
      </div>
    )
  }
}

export default DrawingBox;
