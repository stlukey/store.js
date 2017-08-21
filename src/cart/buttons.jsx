import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';

import {addToCart} from './actions';
import newMessage from '../messages/actions';

import './buttons.scss';

@connect((store) => {
    return {
        user: store.user
    }
})
class _BuyNowButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.preview)
            return null;

        if(this.props.user.token === null)
            return this.props.dispatch(newMessage(
                "You must log in first.",
                'danger'
            ));

        this.props.dispatch(addToCart(this.props.productId,
                                      this.props.quantity))
                  .then(() => {
                      this.props.dispatch(newMessage(
                          "Basket updated.",
                          "info"
                      ));
                      this.props.router.push('/cart');
                  });
    }

    render() {
        return (
            <a className="button is-default" onClick={this.handleClick}>
                Buy now
            </a>
        );
    }
}

export var BuyNowButton = withRouter(_BuyNowButton);


@connect((store) => {
    return {
        cart: store.cart,
        user: store.user
    }
})
export class AddToCartButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.props.preview)
            return null;

        if(this.props.user.token === null)
            return this.props.dispatch(newMessage(
                "You must log in first.",
                'danger'
            ));

        this.props.dispatch(addToCart(this.props.productId,
                                      this.props.quantity))
                  .then(() => {
                      this.props.dispatch(newMessage(
                          "Item added to Basket.",
                          "info"
                      ))
                  });
    }

    render() {
        return (
            <a className="button is-primary" onClick={this.handleClick}>
                Add to Basket
            </a>
        );
    }
}

export class PurchaseButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };

        this.onQuantityChange = this.onQuantityChange.bind(this);
    }

    onQuantityChange(e) {
        var quantity = e.target.value;
        this.setState({quantity})
    }

    render() {
        let {quantity} = this.state;

        return <div>
            <input type="number"
                   value={quantity}
                   onChange={this.onQuantityChange}
                   className="input quantity-input" />

            <BuyNowButton {...this.props} quantity={quantity}/>&nbsp;
            <AddToCartButton {...this.props} quantity={quantity}/>
        </div>;
    }
}
