import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Messages from './Messages';
import { Router, Route, Link, browserHistory } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

window.STORE_API = '/api'

class App extends Component {
    constructor() {
        super();
        this.messages = (<Messages ref="msgs" />);
    }

    componentDidMount() {
        this.refs.msgs.add('App initialized. Welcome!', 'success')
    }

    render() {
        return this.messages;
    }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('root'))

