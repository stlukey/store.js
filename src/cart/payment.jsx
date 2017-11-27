import React, {Component} from 'react';
import Stripe from './stripe';
import PayPal from './paypal';

import Loading from '../app/loading';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: null
        }

        this.openStripe = this.openStripe.bind(this)
    }

    openStripe() {
        this.setState({method: 'stripe'});
    }

    render() {
        switch(this.state.method) {
            case 'stripe':
                return  <Stripe onClose={this.props.onClose}
                                getTotal={this.props.getTotal}
                                tokenReceived={this.props.tokenReceived}/>;
        }

        return <span className="pull-right" id="payment-options">
            <PayPal onClose={this.props.onClose}
                    getTotal={this.props.getTotal}
                    tokenReceived={this.props.tokenReceived}
                    getAddress={this.props.getAddress}/>
            {"     "}
            <a className="button is-primary" onClick={this.openStripe}>
                Pay with Card
            </a>
        </span>
    }
}

export default Payment;
