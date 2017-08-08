import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {
    Router, Route, IndexRoute,
    useRouterHistory, withRouter
} from 'react-router';

import {
    Container,
    Columns,
    Section,
    Title
} from '../src/app/bulma';
import addMessage from '../src/messages/actions';

import AdminApp from './app';
import store from './store';

import AppearencePage from './appearence';

import ProductsPage from './products';
import ProductView from './products/view';
import ProductEdit from './products/edit';

import Pages from './pages';
import ViewPage from './pages/view';
import EditPage from './pages/edit';

import Images, {ImagesPopup} from './images';

import Orders from './orders';
import OrdersView from './orders/view';

import Shipments from './shipments';
import ShipmentsView from './shipments/view';

import Users from './users';

import {setToken} from '../src/app/axios';

window.API = ADMIN_API_URL;

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

const browserHistory = useRouterHistory(createHistory)({
    basename: '/admin'
});

class Dashboard extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const AddToken = ({params, router}) => {
    setToken(params.authToken);
    router.push('/');
    return <span />;
}

const ComingSoon = props => <Title>Coming Soon.</Title>;

const routes = (
    <div>
    <Route path="/token/:authToken" component={withRouter(AddToken)} />
    <Route path="/images/popup" component={ImagesPopup} />
    <Route path="/" component={AdminApp}>
        <IndexRoute component={Dashboard} />

        <Route path="appearence" component={AppearencePage} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductView} />
        <Route path="products/:productId/edit" component={ProductEdit} />

        <Route path="pages" component={Pages} />
        <Route path="pages/:pageId" component={ViewPage} />
        <Route path="pages/:pageId/edit" component={EditPage} />

        <Route path="images" component={Images} />

        <Route path="users" component={Users} />
        <Route path="shipments" component={Shipments} />
        <Route path="shipments/:shipmentId" component={ShipmentsView} />
        <Route path="orders">
            <IndexRoute component={Orders} />
            <Route path=":orderId" component={OrdersView} />
        </Route>

    </Route>
</div>
);


ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>
), document.getElementById('root'))
