import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import './assets/css/lostgloves-styles.css';
import './assets/css/lostgloves-draw-styles.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

{/* <Provider store={store}>
  <Router history={browserHistory} routes={routes} />
</Provider>, */}

registerServiceWorker();
