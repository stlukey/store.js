import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    Router, Route, browserHistory, IndexRoute
} from 'react-router';
import ProductPage from './products/view';

import store from './store';
import App from './app';
import Home from './home';
import Login from './token/login';
import Logout from './token/logout';


export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="/products/:productId" component={ProductPage}/>
                    <Route path="login" component={Login} />
                    <Route path="logout" component={Logout} />
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

