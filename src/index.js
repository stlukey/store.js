import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

window.messages = ReactDOM.render(
    <Messages />,
    document.getElementById('messages')
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

var cart = document.getElementById('cart')
if (typeof(cart) !== 'undefined' && cart !== null) {
    // exists.
}

