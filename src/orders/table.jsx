import React, {Component} from 'react';
import {Link} from 'react-router';

const OrdersTable = props => (
    <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Date/Time</th>
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
                    <td>
                        {order.user}
                    </td>
                    <td>
                        {new Date(order.datetime.$date).toString()}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default OrdersTable;
