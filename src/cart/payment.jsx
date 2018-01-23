import React, {Component} from 'react';

import Stripe from './stripe';
import PayPal from './paypal';

const options = {
    'paypal': false,
    'stripe': true
}

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goToStripe: false
        };
    }

    render() {
        const {total, tokenReceived} = this.props;

        if (this.state.goToStripe)
            return <Stripe onClose={() => this.setState({goToStripe: false})}
                        total={total}
                        tokenReceived={tokenReceived}/>;

        return <span className="pull-right" id="payment-options">
            {options.paypal ? 
                <PayPal tokenReceived={tokenReceived} total={total}/>
            : null}

            <span className="space" />

            {options.stripe ?
                <a className="button is-primary pull-right"
                   onClick={e => this.setState({goToStripe: true})}>
                    Pay with Card
                </a>
            : null}
        </span>;
    }
}

export default Payment;
