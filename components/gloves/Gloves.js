import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import GloveLi from './GloveLi'


import gloveData from '../../data/gloves.json';



class Gloves extends Component {

  constructor(props){
    super(props)
    this.state = {
      gloveData:gloveData,
    }
  }




  render(){
    return(
      <div>

        <Header />

        <div className="glovesCTA">
      		<div className="glovesCTAWrapper">
      			<p>Here is a collection of photographs of <span style={{fontWeight: '500'}}>Lost Gloves</span>.</p>
      			<p>Some have found resting places on fences, benches and trees; set there by a caring stranger.</p>
      			<p>Others lie where they were first lost, separated from their opposite number and loving owner.</p>
      			<p>Some gloves have been found in pairs. Does the owner feel less about losing a pair, than just a single glove?</p>
      			<p>Look carefully at each glove. Does it remind you of something? A face, or an animal perhaps?</p>
      			<p>If you can see what others can’t, you are possibly experiencing the psychological phenomenon known as <span style={{fontWeight: '500'}}>Pareidolia</span>.</p>
      			<p>Don’t worry, it’s quite common, particularly in artists and creative people.</p>
      			<p>Most people see shapes in clouds, or faces on the front of cars. It’s all just <span style={{fontWeight: '500'}}>Pareidolia</span>.</p>
      			<p>If you see a shape on a glove, can you draw it for others to see it too?</p>
      			<p>It doesn’t have to be a work of art, just a quick doodle will do. We’ve even provided some graphics to help you get started.</p>
      			<p>Each <span style={{fontWeight: '500'}}>Lost Glove</span> has its own story, whether it was reunited with its owner, or lost forever.</p>
      			<p>Can you continue the story of each <span style={{fontWeight: '500'}}>Lost Glove</span>?</p>
      		</div>
        </div>

        <div className="gloves">
      		<div className="glovesBox">
      			<ul id="rig">

                { this.state.gloveData.map((glove) =>
                  <GloveLi key={glove.id} glove={glove}   />
                )}

      			</ul>
      		</div>
      	</div>

        <Footer />

    	</div>
    )
  }
}
export default Gloves;
