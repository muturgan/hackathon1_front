import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
