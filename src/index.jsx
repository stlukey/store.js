import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    Router, Route, IndexRoute
} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import ga from 'ga-react-router';

import store from './store';

import App from './app';
import Home from './home';

import Login from './token/login';
import Logout from './token/logout';
import Signup from './token/signup';

import ProductsPage from './products';
import ProductPage from './products/view';
import {ContactPage, AboutPage} from './pages';
import Cart from './cart';
import Account from './account';

const history = createBrowserHistory();

const unlisten = GA_TRACKING_CODE ? history.listen(location => {
  ga('send', location);
}) : null;

window.API = API_URL;

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductPage}/>
        
        <Route path="contact" component={ContactPage} />
        <Route path="about" component={AboutPage} />

        <Route path="cart" component={Cart} />
        <Route path="account" component={Account} />

        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="signup" component={Signup} />
    </Route>
);

class Root extends Component {
    render() {
        return (
            <Router history={history}>
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

