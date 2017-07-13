import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {RequiresLogin} from '../user/login';

import Loading from '../app/loading';
import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand,
    Section
} from '../app/bulma';

import {fetchOrders} from '../orders/actions';
import OrdersTable from '../orders/table';

import {updateUserDetails} from '../user/actions';
import UpdateDetails from './updateDetails';
import newMessage from '../messages/actions';


@connect(store => {
    return {
        user: store.user
    }
})
export class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
    }

    updateDetails({admin, email, ...details}) {
        this.props.dispatch(updateUserDetails({_id:email, ...details}));
    }

    render() {
        if(!this.props.user.fetched)
            return <Loading />;

        return (
            <div className="container">
                <div className="tabs">
                    <ul>
                        <li className="is-active"><Link to="/account">Details</Link></li>
                        <li><Link to="/account/orders">Orders</Link></li>
                    </ul>
                </div>
                <div className="box">
                    <p className="menu-label">Your Details</p>
                    <UpdateDetails details={this.props.user.details}
                                   updateDetails={this.updateDetails}/>
                </div>
            </div>
        )
    }
}

@connect((store) => {
    return {
        orders: store.orders
    }
})
class Orders extends Component {
    componentDidMount() {
        this.props.dispatch(fetchOrders());
    }

    render() {
        let {orders} = this.props;
        window.orders = orders;

        if(orders.error)
            return alert(this.orders.error);
        if(!orders.fetched)
            return <Loading />;

        if(orders.data.length < 1)
            return (
                <span>You currently have not placed any orders.</span>
            );

        return <OrdersTable orders={orders} />;
    }
}

export const AccountOrders = () => (
  <div className="container">
    <div className="tabs">
      <ul>
        <li><Link to="/account">Details</Link></li>
        <li className="is-active"><Link to="/account/orders">Orders</Link></li>
      </ul>
    </div>
    <div className="box">
      <p className="menu-label">Your Orders</p>
      <Orders />
    </div>
  </div>
)

export default class Account extends Component {
    render() {
        return (
            <RequiresLogin>
                <Section>
                    <Title>Your Account</Title>
                    {this.props.children}
                </Section>
            </RequiresLogin>
        );
    }
}
