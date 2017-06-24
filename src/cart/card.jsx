import React, {Component} from 'react';
import Cards from 'react-credit-cards';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-credit-cards/lib/styles.scss';

import Icon from '../app/icon';
import Payment from 'payment';



let loadedStripe = true;

class Card  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            exp: '',
            cvc: '',
            focused: '',
        };
    }

    componentDidMount() {
        Payment.formatCardNumber(document.querySelector('[name="number"]'));
        Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
        Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
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
            <div className="rccs__demo">
                <div className="rccs__demo__content">
                    <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                        />
                    <form>
                        <center>
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
                                    placeholder="Valid Thru"
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

class PaymentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true
        }
        this.closeDialog = this.closeDialog.bind(this);
    }



    closeDialog = () => {
        this.setState({dialogOpen: false});
        this.props.onClose();
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog
                        title={
                            <div>
                                <a href="#" onClick={this.closeDialog} className="pull-right">
                                    <Icon>close</Icon>
                                </a>
                                <h1>Make Payment</h1>
                            </div>
                        }
                        modal={false}
                        open={this.state.dialogOpen}
                    >
                        <div>
                                <Card />
                                <a className="button is-primary pull-right" onClick={this.goToCheckout}>
                                    Pay £{this.props.getTotal()}
                                </a>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default PaymentDialog;
