import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import {createHistory} from 'history';
import {
    Router, Route, IndexRoute,
    useRouterHistory,
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

import ProductsPage from './products';
import ProductView from './products/view';
import ProductEdit from './products/edit';

import Pages from './pages';
import ViewPage from './pages/view';
import EditPage from './pages/edit';

import Users from './users';

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

const ComingSoon = props => <Title>Coming Soon.</Title>;

const routes = (
    <Route path="/" component={AdminApp}>
        <IndexRoute component={Dashboard} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductView} />
        <Route path="products/:productId/edit" component={ProductEdit} />

        <Route path="pages" component={Pages} />
        <Route path="pages/:pageId" component={ViewPage} />
        <Route path="pages/:pageId/edit" component={EditPage} />

        <Route path="users" component={Users} />
        <Route path="shipments" component={ComingSoon} />
        <Route path="orders" component={ComingSoon} />
    </Route>
);


ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>
), document.getElementById('root'))

