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


var SaveForm = (props) => (
    <Container>
        <Columns>
            <div>
                <form onSubmit={props.handleSubmit}>

                    <Label>Email</Label>
                    <pCommand>
                        <Field name="email"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Password</Label>
                    <pCommand>
                        <Field name="password"
                               component="input"
                               type="password" />
                    </pCommand>

                    <Label>Confirm Password</Label>
                    <pCommand>
                        <Field name="confirm"
                               component="input"
                               type="password" />
                    </pCommand>

                    <Label>First Name</Label>
                    <pCommand>
                        <Field name="first"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Last Name</Label>
                    <pCommand>
                        <Field name="last"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Contact Number</Label>
                    <pCommand>
                        <Field name="contact"
                               component="input"
                               type="text" />
                    </pCommand>


                    <br />
                    <br />
                    <ControlButton className="is-primary" type="submit">
                        Save
                    </ControlButton>
                </form>
            </div>
        </Columns>
    </Container>
);

SaveForm = reduxForm({
      form: 'save'
})(SaveForm);

export const AccountDetails = () => (
  <div className="container">
    <div className="tabs">
      <ul>
        <li className="is-active"><Link to="/account">Details</Link></li>
        <li><Link to="/account/orders">Orders</Link></li>
      </ul>
    </div>
    <div className="box">
      <p className="menu-label">Your Details</p>
      <SaveForm />
    </div>
  </div>
)

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

