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
import {CMSRoute} from './pages';
import Cart from './cart';
import Account from './account';
import {AccountDetails, AccountOrders} from './account';
import Order from './orders';

const history = useRouterHistory(createHistory)({
    basename: '/demo'
});



const unlisten = GA_TRACKING_CODE ? history.listen(location => {
    console.log('Connected to GA with tracking code:', GA_TRACKING_CODE);
    ga('send', location);
}) : null;

window.API = API_URL;
window.SITE_TITLE = "Maryam's Persian Pantry";

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductPage}/>

        <Route path="contact" component={CMSRoute()} />
        <Route path="about" component={CMSRoute()} />
        <Route path="press" component={CMSRoute()} />
        <Route path="faqs" component={CMSRoute()} />
        <Route path="delivery-and-returns" component={CMSRoute()} />
        <Route path="terms-and-conditions" component={CMSRoute()} />
        <Route path="privacy" component={CMSRoute()} />

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
