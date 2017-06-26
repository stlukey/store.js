import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchOrders} from './actions';

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
class OrdersTable extends Component {
    componentDidMount() {
        this.props.dispatch(fetchOrders());
    }

    render() {
        if(this.props.orders.error)
            alert(this.props.orders.error);

        if(!this.props.orders.fetched)
            return <Loading />;

        const orders = this.props.orders.data.map((order, index) => (
            <tr key={index}>
                <td>
                    <Link to={`/orders/${order._id.$oid}`}>
                        {order._id.$oid}
                    </Link>
                </td>
                <td>
                    {order.user}
                </td>
                <td>
                    {new Date(order.datetime.$date).toString()}
                </td>
            </tr>
        ))

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>
        );
    }
}

const Orders = (props) => (
    <div>
        <Title>Orders</Title>
        <Section>
            <OrdersTable />
        </Section>
    </div>
);

export default Orders;
