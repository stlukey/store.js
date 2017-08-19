import React, {Component} from 'react';
import {Link} from 'react-router';

import "../cart/cart.scss";

const OrdersTable = props => (
    <table className="table cart-table">
        <thead>
            <tr>
                <th>ID</th>
                <th className="desktop-column">Email</th>
                <th className="desktop-column">Date/Time</th>
            </tr>
        </thead>
        <tbody>
            {props.orders.data.map((order, index) => (
                <tr key={index}>
                    <td>
                        <Link to={`/orders/${order._id.$oid}`}>
                            {order._id.$oid}
                        </Link>
                    </td>
                    <td className="desktop-column">
                        {order.user}
                    </td>
                    <td className="desktop-column">
                        {new Date(order.datetime.$date).toString()}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default OrdersTable;
