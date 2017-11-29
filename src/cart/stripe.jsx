import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'babel-polyfill';
import Cards from 'react-credit-cards';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-credit-cards/lib/styles.scss';

import Icon from '../app/icon';
import Payment from 'payment';

import Loading from '../app/loading';


window.Stripe = null;

const demo = false;

const loadStripe = (onLoad = () => {}) => {
    if(window.Stripe !== null){
        onLoad();
        return null;
    }
    var body = document.querySelectorAll('body')[0];
    var script = document.createElement('script');
    script.src = "https://js.stripe.com/v2/";
    body.appendChild(script);
    script.addEventListener('load',
        () => {
            window.Stripe.setPublishableKey(STRIPE_KEY);
            onLoad();
        }
    );
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = demo ? {
            number: '4242 4242 4242 4242',
            name: 'Foo',
            expiry: '1018',
            cvc: '181',
            focused: '',
        } : {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            focused: '',
        };
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
    }

    getDetails() {
        const {number, name, expiry, cvc} = this.state;
        var exp_month = expiry.substring(0, 2);
        var exp_year = expiry.substring(2);
        return {
            number, name,
            exp_month, exp_year,
            cvc
        }
    }

    handleInputFocus = (e) => {
        const target = e.target;

        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = (e) => {
        const target = e.target;

        if (target.name === 'number') {
            this.setState({
                [target.name]: target.value.replace(/ /g, ''),
            });
        }
        else if (target.name === 'expiry') {
            this.setState({
                [target.name]: target.value.replace(/ |\//g, ''),
            });
        }
        else {
            this.setState({
                [target.name]: target.value,
            });
        }
    };

    handleCallback(type, isValid) {
        console.log(type, isValid); //eslint-disable-line no-console
    }

    render() {
        const { name, number, expiry, cvc, focused } = this.state;
        return (
            <div>
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                    callback={this.handleCallback}
                />
                <div>
                    <form>
                        <center id="card-input">
                            <br/>
                            <div>
                                <input
                                    type="tel"
                                    name="number"
                                    placeholder="Card Number"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="expiry"
                                    placeholder="Valid Thru (mm/yy)"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    />
                                <input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    onKeyUp={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    />
                            </div>
                        </center>
                    </form>
                </div>
            </div>
        );
    }
}

@connect((store) => {
    return {
        order: store.order
    };
})
class PaymentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true,
            processing: false,
            loaded: false,
            error: null
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.process = this.process.bind(this);
        this.stripeResponseHandler = this.stripeResponseHandler.bind(this);
    }

    componentDidMount() {
        loadStripe(() => {this.setState({loaded: true})});
    }

    closeDialog() {
        this.setState({dialogOpen: false});
        this.props.onClose();
    }

    process() {
        this.setState({processing: true});
        window.Stripe.card.createToken(this.card.getDetails(), this.stripeResponseHandler);
    }

    stripeResponseHandler(status, resp) {
        if(resp.error) {
            console.error(resp.error);
            this.setState({
                error: resp.error.message,
                processing: false
            });
        } else {
            this.props.tokenReceived({type: 'stripe', data: resp.id});
        }
    }

    loading() {
        return this.state.processing || !this.state.loaded;
    }

    componentWillUpdate() {
        if(this.props.order.error !== null) {
            this.setState({
                processing: false
            });
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Dialog
                    title={
                        <div>
                            {this.loading() ? (<span />) : (
                                <a href="#" onClick={this.closeDialog} className="pull-right">
                                    <Icon>close</Icon>
                                </a>
                            )}
                            <h1>Make Payment</h1>
                        </div>
                    }
                    modal={false}
                    open={this.state.dialogOpen}
                >
                    {this.loading() ? (<Loading />) : (
                        <div>
                            {this.state.error !== null ? (
                                <div className="notification is-danger">
                                    {this.state.error} <br/>
                                    Please try again.
                                </div>
                            ) : (<span />)}
                            <Card ref={(card) => {this.card = card}}/>
                            <a className="button is-primary pull-right" onClick={this.process}>
                                Pay £{this.props.total}
                            </a>
                        </div>
                    )}
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

export default PaymentDialog;
