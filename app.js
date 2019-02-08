import React from 'react';
import ReactDOM from 'react-dom';

import './src/style/main.less';
// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import App from './src/App.jsx';
ReactDOM.render(<App />, document.getElementById('app'));