import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    Router, Route, browserHistory, IndexRoute
} from 'react-router';

import store from './store';
import App from './app';
import Home from './home';
import Login from './users/login';

window.STORE_API = '/api';

export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="login" component={Login} />
                </Route>
            </Router>
        );
    }
}


ReactDOM.render((
    <Provider store={store}>
        <Root />
    </Provider>
), document.getElementById('root'))

