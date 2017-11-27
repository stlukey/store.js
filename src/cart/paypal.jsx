import React, {Component} from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';

const client = {
    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
}

const payment = (getTotal, getAddress) => (data, actions) => {
    var experience = {
        input_fields: {
            "allow_note": true,
            // "no_shipping": 1,
            "address_override": 1
        }
    };

    actions.payment.create({
        payment: {
            transactions: [
                {
                    amount: { total: getTotal(), currency: 'GBP'}
                }
            ],
            item_list: {
                shipping_address: getAddress()
            }
        },
        experience: experience
    });
}

const onAuthorize = (data, actions) => actions.payment.execute().then(function(data) {
    window.data = data;
    alert('Payment Complete!');
});

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });



class PayPal extends Component {
    render() {
        const {getTotal, getAddress} = this.props;

        return <PayPalButton client={client}
                     payment={payment(getTotal, getAddress)}
                     commit={true}
                     onAuthorize={onAuthorize}
                     env={'sandbox'}/>
    }
}

export default PayPal;
