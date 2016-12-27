import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import { createHistory } from 'history';
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

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

const browserHistory = useRouterHistory(createHistory)({
    basename: '/admin'
});

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Title>
                    Dashboard
                </Title>
                <Section>
                    Todays sales: 23
                </Section>
            </div>
        );
    }
}


const routes = (
    <Route path="/" component={AdminApp}>
        <IndexRoute component={Dashboard} />

        <Route path="products" component={ProductsPage} />
        <Route path="products/:productId" component={ProductView} />
        <Route path="products/:productId/edit" component={ProductEdit} />
    </Route>
);


ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>
), document.getElementById('root'))

