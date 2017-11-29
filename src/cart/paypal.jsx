import React, {Component} from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';

const client = {
    sandbox: 'AUDVe4PIXHRyGJTsEWce8taryZPazwPBST-K4025LYGOg52c50pDQZ5kl7YTRp1kATOVkzx026NOplF1'
}

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

class PayPal extends Component {
    constructor(props) {
        super(props);
        this.payment = this.payment.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
    }

    payment(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: {
                            total: this.props.total,
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

    onAuthorize(data, actions) {
        window.data = data;
        this.props.tokenReceived({
            type: "paypal",
            data: {
                paymentID: data.paymentID,
                payerID:   data.payerID
        }});

    }

    render() {
        return <PayPalButton client={client}
                     payment={this.payment}
                     commit={true}
                     onAuthorize={this.onAuthorize}
                     env={'sandbox'}/>
    }
}

export default PayPal;
