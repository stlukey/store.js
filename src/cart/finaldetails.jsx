import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost,
} from './actions';
import {placeOrder} from '../orders/actions';
import newMessage from '../messages/actions';


import Payment from './payment';

import address from './address';

import linkStateField from '../helpers/linkStateField';

@connect((store) => {
    return {
        cart: store.cart,
        order: store.order
    }
})
class FinalDetails extends Component {
    constructor(props) {
        super(props);
        this.paymentAbort = this.paymentAbort.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.tokenReceived = this.tokenReceived.bind(this);

        this.state = {
            shippingMethod: null,
            address: {},
            goToPayment: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCartCost());
    }

    componentWillUpdate() {
        var {error} = this.props.order;
        if (error && this.state.goToPayment) {
            this.props.updateCart();
            this.setState({goToPayment: false});
        };
    }

    //

    getTotal() {
        if(this.state.shippingMethod == null)
            return null;
        return (
            this.cost.sub_total
            + this.cost.shipping[this.state.shippingMethod]
        ).toFixed(2);
    }

    checkDetails() {
        const required = [
            "name",
            "line1",
            "city",
            "county",
            "postcode"
        ];
        for (let key of required)
        {
            if(!this.state.address[key])
            {
                this.props.dispatch(newMessage(`Error: ${key} is required.`, "danger"));
                return false;
            }
        }

        return true;
    }

    paymentAbort() {
        this.setState({payment: false});
    }

    tokenReceived(token) {
        console.log('running');
        this.props.placeOrder(token, this.state.address, this.state.shippingMethod);
    }

    // Render

    renderShippingMethods() {
        return (
            <span className="pull-right">
                <select className="full-width" onChange={(e) => this.setState({
                    shippingMethod: e.target.value
                })}>
                    <option disabled selected>
                        Click to select a delvivery method below.
                    </option>
                    <option value={0}>
                        Royal Mail 1st Class (1 to 2 working days)
                        £{this.cost.shipping[0].toFixed(2)}
                    </option>
                    <option value={1}>
                        Royal Mail 2nd Class (2 to 3 working days)
                        £{this.cost.shipping[1].toFixed(2)}
                    </option>
                </select>
            </span>
        );
    }

    renderShipping() {
        if(this.state.shippingMethod == null)
            return (<span />);

        const linkToAddress = linkStateField(this, 'address');

        return address(linkToAddress);
    }

    renderTotal() {
        var total = this.getTotal();
        if(total == null)
            return (<span />);

        return (
            <span className="pull-right">
                <b>Total: </b>£{total}
            </span>
        );
    }

    renderPaymentMethods() {
        if (this.state.shippingMethod == null)
            return <span />;

        if (DEMO) {
            alert("Sorry but you can not order just yet! this site is a demo.")
            return <span />;
        }

        if (!this.state.goToPayment)
            return <a className="button is-primary pull-right"
               onClick={e => {if(this.checkDetails())
                        this.setState({goToPayment: true})}}>
                Place Order
            </a>;

        return <Payment total={this.getTotal()}
                        tokenReceived={this.tokenReceived}/>;
    }


    render() {
        if(this.props.cart.costError)
            alert(this.props.cart.costError);
        if(!this.props.cart.costFetched)
            return (<Loading />);

        this.cost = this.props.cart.cost.data;

        return (
            <div>
                <br/>
                <span className="pull-right">
                    <b>Subtotal: </b>£{this.cost.sub_total.toFixed(2)}
                </span>
                <br/>
                {this.renderShippingMethods()}
                <br />
                <br />
                {this.renderShipping()}
                <hr />
                {this.renderTotal()}
                <br />
                {this.renderPaymentMethods()}
            </div>
        );
    }
}

export default FinalDetails;
