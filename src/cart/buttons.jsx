import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';

import {addToCart} from './actions';
import newMessage from '../messages/actions';

@connect((store) => {
    return {
        token: store.token
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
        
        if(!this.props.token.valid)
            return this.props.dispatch(newMessage(
                "You must log in first.",
                'danger'
            ));

        this.props.dispatch(addToCart(this.props.productId))
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
        token: store.token
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
        
        if(!this.props.token.valid)
            return this.props.dispatch(newMessage(
                "You must log in first.",
                'danger'
            ));

        this.props.dispatch(addToCart(this.props.productId))
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

