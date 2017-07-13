import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Section, Title, Columns
} from '../../src/app/bulma';

import {fetchAll} from '../products/actions';

import Loading from '../../src/app/loading';
import {OrderView} from '../../src/orders';

import {fetchOrders} from './actions'

function findOrder(orders, orderId) {
    for(var order of orders)
        if(order._id.$oid == orderId)
            return order;
}

@connect((store) => {
    return {
        products: store.products.products,
        orders: store.admin.orders
    }
})
class Order extends Component {
    componentDidMount() {
        if(!this.props.products.fetched) this.props.dispatch(fetchAll());
        if(!this.props.orders.fetched) this.props.dispatch(fetchOrders());
    }

    render() {
        if(this.props.products.error)
            return alert(this.props.products.error);

        if(!this.props.orders.fetched || !this.props.products.fetched)
            return (<Loading />);

        return (
            <OrderView productsData={this.props.products.products.data}
                       orderData={findOrder(this.props.orders.data, this.props.params.orderId)} />
        );
    }
}

export default Order;
