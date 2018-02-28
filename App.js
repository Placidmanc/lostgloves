import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Gloves from './components/gloves/Gloves';
import Draw from './components/draw/Draw';
import About from './components/about/About';
import SignIn from './components/signin/SignIn';
import ScrollToTop from './components/common/ScrollToTop';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }


  render() {
    return (
      <ScrollToTop>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path='/gloves' component={Gloves}/>
            <Route path='/draw' component={Draw}/>
            <Route path='/draw/:gloveid' component={Draw}/>
            <Route path='/about' component={About}/>
            <Route path='/sign-in' component={SignIn}/>
          </Switch>
        </div>
      </ScrollToTop>);
  }
}

export default App;
