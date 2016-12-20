import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    Router, Route, browserHistory, IndexRoute
} from 'react-router';

import store from './store';

import App from './app';
import Home from './home';
import Login from './token/login';
import Logout from './token/logout';
import ProductsPage from './products';
import ProductPage from './products/view';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductPage}/>
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
    </Route>
);

class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
               {routes} 
            </Router>
        );
    }
}


ReactDOM.render((
    <Provider store={store}>
        <Root />
    </Provider>
), document.getElementById('root'))

