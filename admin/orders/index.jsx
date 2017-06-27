import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchOrders} from './actions';
import OrdersTable from '../../src/orders/table';

import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

@connect(store => {
    return {
        orders: store.orders
    }
})
class Orders extends Component {
    componentDidMount() {
        this.props.dispatch(fetchOrders());
    }

    render() {
        if(this.props.orders.error)
            alert(this.props.orders.error);

        if(!this.props.orders.fetched)
            return <Loading />;

        return (
            <div>
                <Title>Orders</Title>
                <Section>
                    <OrdersTable orders={this.props.orders}/>
                </Section>
            </div>
        );
    }
}

export default Orders;
