import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Gloves from './components/Gloves';
import Draw from './components/Draw';
import About from './components/About';
import SignIn from './components/SignIn';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      //
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/gloves' component={Gloves} />
              <Route exact path='/draw' component={Draw} />
              <Route exact path='/about' component={About} />
              <Route exact path='/sign-in' component={SignIn} />
           </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
