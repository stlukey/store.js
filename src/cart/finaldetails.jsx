import React, {Component} from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost,
} from './actions';
import {placeOrder} from '../orders/actions';
import newMessage from '../messages/actions';


import Stripe from './stripe';
import address from './address';

const linkStateFeild = (obj, feildKey) => (key) => (e) => {
    var state = obj.state;
    state[feildKey][key] = e.target.value;
    obj.setState(state)
}

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
const paypalClient = {
    sandbox: 'AUDVe4PIXHRyGJTsEWce8taryZPazwPBST-K4025LYGOg52c50pDQZ5kl7YTRp1kATOVkzx026NOplF1'
}

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
        this.paypalPayment = this.paypalPayment.bind(this);
        this.paypalOnAuthorize = this.paypalOnAuthorize.bind(this);

        this.state = {
            shippingMethod: null,
            address: {},
            goToStripe: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCartCost());
    }

    componentWillUpdate() {
        var {error} = this.props.order;
        if (error && this.state.goToStripe) {
            this.props.updateCart();
            this.setState({goToStripe: false});
        };
    }

    // PayPal

    paypalPayment(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: {
                            total: this.getTotal(),
                            currency: 'GBP'
                        }
                    }
                ]
            },

            experience: {
                input_fields: {
                    no_shipping: 1
                }
            }
        });
    }

    paypalOnAuthorize(data, actions) {
        this.tokenReceived({
            type: "paypal",
            data: {
                paymentID: data.paymentID,
                payerID:   data.payerID
        }});

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
                <b>Shipping: </b>
                <select onChange={(e) => this.setState({
                    shippingMethod: e.target.value
                })}>
                    <option disabled selected>
                        Select a delivery option.
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

        const linkToAddress = linkStateFeild(this, 'address');

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

        return !this.state.goToStripe ? (<span className="pull-right" id="payment-options">
            <PayPalButton client={paypalClient}
                         payment={this.paypalPayment}
                         commit={true}
                         onAuthorize={this.paypalOnAuthorize}
                         env={'sandbox'}/>
            <span className="space" />
            <a className="button is-primary pull-right"
               onClick={e => this.setState({goToStripe: true})}>
                Pay with Card
            </a>
        </span> ) : ( <Stripe onClose={this.paymentAbort}
                getTotal={this.getTotal}
                tokenReceived={this.tokenReceived}/> );
    }

    renderStripe() {
        return true ? (<span />) : (!this.state.goToStripe ? (
            <a className="button is-primary pull-right"
               onClick={e => {
                    if (this.checkDetails())
                        this.setState({goToStripe: true})
            }}>
                Place Order
            </a>
        ) : (
            <Stripe onClose={this.paymentAbort}
                    getTotal={this.getTotal}
                    tokenReceived={this.tokenReceived}/>
        ));
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
                {this.renderStripe()}
            </div>
        );
    }
}

export default FinalDetails;
