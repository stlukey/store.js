import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {withRouter} from 'react-router';

import paypal from 'paypal-checkout';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost,
    removeFromCart, setItemQuantityInCart
} from './actions';
import {fetchAll} from '../products/actions';
import newMessage from '../messages/actions';
import {Section, Title} from '../app/bulma';
import Payment from './card';
import {placeOrder} from '../orders/actions';
import CartTable from './carttable';

import FinalDetails from './finaldetails';

@connect((store) => {
    return {
        cart: store.cart,
        products: store.products,
    }
})
class Cart extends Component {
    constructor(props) {
        super(props);
        this.placeOrder = this.placeOrder.bind(this);
        this.updateCart = this.updateCart.bind(this);

        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchAll());
        this.props.dispatch(fetchCart());
    }

    placeOrder(card_token, address, shipping_method){
        this.setState({loading: true});
        const data = {
            ...address,
            card_token,
            shipping_method
        };
        let {router,dispatch} = this.props;
        dispatch(placeOrder(data, router));
    }

    updateCart() {
        this.props.dispatch(fetchCart());
    }

    render() {
        if(this.props.cart.error)
            return alert(this.props.cart.error);
        if(!this.props.cart.fetched)
            return (<Loading />);
        if (this.state.loading)
            return <Loading />;

        const products = this.props.cart.products;

        var empty = true;
        if(products.data !== undefined &&
           products.data.data !== undefined &&
           Object.keys(products.data.data).length !== 0)
           empty = false;

        return (
            <Section>
                <Title>Items in your Basket</Title>
                {empty ? (
                    <span>Empty.</span>
                ) : (
                    <span>
                        <CartTable />
                        <FinalDetails placeOrder={this.placeOrder}
                                      key={window.orders}
                                      updateCart={this.updateCart}/>
                    </span>
                )}
            </Section>
        );
    }
}

export default withRouter(Cart);
