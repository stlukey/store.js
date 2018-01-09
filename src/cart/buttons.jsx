import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';

import {addToCart} from './actions';
import newMessage from '../messages/actions';

import goToLogin from '../user/goToLogin';

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

        const {
            preview, user, dispatch,
            productId, quantity, router
        } = this.props;

        if(preview)
            return null;

        if(user.details === null)
            return goToLogin(router, dispatch);

        dispatch(addToCart(productId, quantity))
                  .then(() => {
                      dispatch(newMessage(
                          "Basket updated.",
                          "info"
                      ));
                      router.push('/cart');
                  });
    }

    render() {
        return (
            <a className="button is-default is-primary" onClick={this.handleClick}>
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
export class _AddToCartButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {
            preview, user, dispatch,
            productId, quantity, router
        } = this.props;

        if(preview)
            return null;

        if(user.details === null)
            return goToLogin(router, dispatch);

        dispatch(addToCart(productId, quantity))
                  .then(() => {
                      dispatch(newMessage(
                          "Item added to Basket.",
                          "info"
                      ))
                  });
    }

    render() {
        return (
            <a className="button" onClick={this.handleClick}>
                Add to Basket
            </a>
        );
    }
}
export var AddToCartButton = withRouter(_AddToCartButton);


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

            <AddToCartButton {...this.props} quantity={quantity}/>
            &nbsp;
            <BuyNowButton {...this.props} quantity={quantity}/>
        </div>;
    }
}
