import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';

import {
    fetchCart, addToCart,
    removeFromCart
} from './actions';
import {fetchAll} from '../products/actions';
import newMessage from '../messages/actions';
import {Section, Title} from '../app/bulma';

import './cart.scss';


@connect((store) => {
    return {
        cart: store.cart,
        token: store.token
    }
})
class _BuyNowButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
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


@connect((store) => {
    return {
        token: store.token
    }
})
class CartItem extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(!this.props.token.valid)
            return this.props.dispatch(newMessage(
                "You must log in first.",
                'danger'
            ));

        this.props.dispatch(removeFromCart(this.props.product._id.$oid))
                  .then(() => {
                      this.props.dispatch(newMessage(
                          "Basket updated.",
                          "info"
                      ))
                  });
    }

    render() {
        var {product, quantity} = this.props;
        return (
            <tr>
                <td><figure className="image is-64x64">
                    <img src={`${API_URL}${product.images[0]}`} />
                </figure></td>
                <td>{product.name}</td>
                <td>£{product.cost}</td>
                <td>X</td>
                <td>{quantity}</td>
                <td>
                    <a href='#' onClick={this.handleClick}>Delete</a>
                </td>        
            </tr>
        )    
    }
}

const findProduct = (item, products) => {
    for(var i in products) {
        if(products[i]._id.$oid === item) {
            return products[i];
        }
    }
    console.log(`ERROR: product with id '${item}' not found.`)
}

const makeCart = (cartItems, products) => {
    var cart = [];
    var i = 0;
    var total = 0;
    for(var item in cartItems){
        var product = findProduct(item, products);
        total += product.cost * cartItems[item];
        cart.push(<CartItem product={product}
                            quantity={cartItems[item]}
                            key={i++} />);
    }

    return [
        <table className="table" key={0}>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart}
            </tbody>
        </table>,
        <span className="pull-right" key={1}>
            <b>Total: £</b>
            {total.toFixed(2)}
        </span>
    ];
}

const CheckoutButton = (props) => (
    <a className="button is-primary pull-right">
        Proceed to checkout
    </a>     
);


@connect((store) => {
    return {
        cart: store.cart,
        products: store.products.products
    }
})
class Cart extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCart());
        if(!this.props.products.fetched || this.props.products.fetching)
            this.props.dispatch(fetchAll());
    }

    render() {
        if(this.props.cart.error)
            alert(this.props.cart.error);
        if(this.props.products.error)
            alert(this.props.products.error);

        if(!(this.props.cart.fetched && this.props.products.fetched))
            return (<Loading />);

        return (
            <Section>
                <Title>Items in your Basket</Title>
                {makeCart(this.props.cart.products.data,
                          this.props.products.products.data)}
                <br/>
                <CheckoutButton />
            </Section>
        );
    }
}

export default Cart;

