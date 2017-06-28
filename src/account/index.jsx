import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {RequiresLogin} from '../token/login';

import Loading from '../app/loading';
import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand,
    Section
} from '../app/bulma';

import {fetchOrders} from '../orders/actions';
import OrdersTable from '../orders/table';

import {fetchTokenDetails, updateTokenDetails} from '../token/actions';
import UpdateDetails from './updateDetails';
import newMessage from '../messages/actions';


@connect(store => {
    return {
        token: store.token
    }
})
export class AccountDetails extends Component {
    componentDidMount() {
        this.props.dispatch(fetchTokenDetails())
        this.updateDetails = this.updateDetails.bind(this);
    }

    updateDetails(details) {
        this.props.dispatch(updateTokenDetails(details))
                  .then(() => this.dispatch(newMessage("Details updated.", 'success')))
                  .catch((error) => alert(error));
    }

    render() {
        if(this.props.token.error)
            return alert(this.props.token.error);
        if(!this.props.token.fetched)
            return <Loading />;

        window.deets = this;
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
                    <UpdateDetails details={this.props.token.data}
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
        if(this.props.orders.error)
            return alert(this.orders.error);
        if(!this.props.orders.fetched)
            return (<Loading />);

        return (
            <OrdersTable orders={this.props.orders} />
        );
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

