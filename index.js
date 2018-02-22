import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/lostgloves-styles.css';
import './assets/css/lostgloves-draw-styles.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
