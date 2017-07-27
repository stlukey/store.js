import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
    Router, Route, IndexRoute,
    useRouterHistory
} from 'react-router';
import {createHistory} from 'history';
import ga from 'ga-react-router';

import store from './store';

import App from './app';
import Home from './home';

import Login from './user/login';
import Logout from './user/logout';
import Signup from './user/signup';
import ConfirmEmail from './user/confirm';
import Recovery from './user/recovery';

import ProductsPage from './products';
import ProductPage from './products/view';
import {ContactPage, AboutPage} from './pages';
import Cart from './cart';
import Account from './account';
import {AccountDetails, AccountOrders} from './account';
import Order from './orders';

import Sandbox from './sandbox'; // comment this out in production
const SANDBOX = false;

const history = useRouterHistory(createHistory)();


const unlisten = GA_TRACKING_CODE ? history.listen(location => {
    console.log('Connected to GA with tracking code:', GA_TRACKING_CODE);
    ga('send', location);
}) : null;

window.API = API_URL;

const routes = SANDBOX ? (
    <Route path="/" component={App}>
        <IndexRoute component={Sandbox} />

        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
    </Route>
) : (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductPage}/>

        <Route path="contact" component={ContactPage} />
        <Route path="about" component={AboutPage} />

        <Route path="cart" component={Cart} />
        <Route path="orders/:orderId" component={Order} />
        <Route path="account" component={Account}>
            <IndexRoute component={AccountDetails} />
            <Route path="orders" component={AccountOrders}/>
        </Route>

        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="signup" component={Signup} />

        <Route path="confirm/:emailToken" component={ConfirmEmail} />
        <Route path="recovery/:emailToken" component={Recovery} />
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
