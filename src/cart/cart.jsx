import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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
import Stripe from './card';
import {placeOrder} from '../orders/actions';

@connect() // Only dispatches.
class CartItem extends Component {
    constructor(props) {
        super(props)

        this.state = {editing: false, quantity: this.props.quantity}


        this.editingToggle = this.editingToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEditSave() {
        this.props.dispatch(setItemQuantityInCart(
            this.props.product._id.$oid,
            this.state.quantity))
          .then(() => {
              this.props.dispatch(newMessage(
                  "Basket updated.",
                  "info"
              ));
              this.props.dispatch(fetchCart());
              this.props.dispatch(fetchCartCost());
          }).catch((e) => alert(e));
    }

    handleChange(event) {
        this.setState({quantity: parseInt(event.target.value)});
    }

    editingToggle() {
        if(this.state.editing)
            this.handleEditSave();
        this.setState({editing: !this.state.editing});
    }

    handleDelete() {
        this.props.dispatch(removeFromCart(this.props.product._id.$oid))
                  .then(() => {
                      this.props.dispatch(newMessage(
                          "Basket updated.",
                          "info"
                      ));
                      this.props.dispatch(fetchCart());
                      this.props.dispatch(fetchCartCost());
                  });
    }

    render() {
        var product = this.props.product;

        var editLink = (
            <a href='#' onClick={this.editingToggle}>
                {this.state.editing ? 'done' : 'edit'}
            </a>
        );

        var quantity = this.state.editing ? (
            <td>
                <input type="number" value={this.state.quantity}
                       onChange={this.handleChange} /> {editLink}
            </td>
        ) : (
            <td>
                {this.state.quantity} ({editLink})
            </td>
        );

        return (
            <tr>
                <td><figure className="image is-64x64">
                    <img src={`${API_URL}${product.images[0]}`} />
                </figure></td>
                <td>
                    <Link to={"/products/" + product._id.$oid}>
                        {product.name}
                    </Link>
                </td>
                <td>£{product.cost}</td>
                <td>X</td>
                {quantity}
                <td>
                    <a href='#' onClick={this.handleDelete}>Delete</a>
                </td>
            </tr>
        )
    }
}

/***
 Looks up product from ID.
 ***/
export var findProduct = (item, products) => {
    for(var i in products) {
        if(products[i]._id.$oid === item) {
            return products[i];
        }
    }
    console.log(`ERROR: product with id '${item}' not found.`)
}


/* WARNING: cart is expected to be loaded error-free. */
@connect((store) => {
    return {
        cart: store.cart,
        products: store.products.products
    }
})
class CartTable extends Component {
    componentDidMount() {
        this.props.dispatch(fetchAll());
    }


    render() {
        if(this.props.products.error)
            return alert(this.props.products.error);
        if(!this.props.products.fetched)
            return (<Loading />);

        var cartItems = this.props.cart.products.data;

        return (
            <table className="table cart-table">
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
                    {Object.keys(cartItems.data).map((item, i) => (
                        <CartItem product={findProduct(item,
                                                       this.props.products.products.data)}
                                  quantity={cartItems.data[item]}
                                  key={i} />)
                    )}
                </tbody>
            </table>
        );
    }
}

const linkStateFeild = (obj, feildKey) => (key) => (e) => {
    var state = obj.state;
    state[feildKey][key] = e.target.value;
    obj.setState(state)
}

const address = link => <form>
    <Title>Address Details</Title>
    <div className="input-row">
        <input className="input"
               placeholder="Name"
               name="name"
               type="text"
               onChange={link('name')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 1"
               name="line1"
               type="text"
               onChange={link('line1')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 2"
               name="line2"
               type="text"
               onChange={link('line2')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 3"
               name="line3"
               type="text"
               onChange={link('line3')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="City"
               name="city"
               type="text"
               onChange={link('city')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="County"
               name="county"
               type="text"
               onChange={link('county')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Postcode"
               type="text"
               onChange={link('postcode')}/>
    </div>
</form>;

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
const paypalClient = {
    sandbox: 'AUDVe4PIXHRyGJTsEWce8taryZPazwPBST-K4025LYGOg52c50pDQZ5kl7YTRp1kATOVkzx026NOplF1'
}

@connect((store) => {
    return {
        cart: store.cart,
        order: store.order
    }
})
class FinalDetails extends Component {
    constructor(props) {
        super(props);
        this.paymentAbort = this.paymentAbort.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.tokenReceived = this.tokenReceived.bind(this);
        this.paypalPayment = this.paypalPayment.bind(this);
        this.paypalOnAuthorize = this.paypalOnAuthorize.bind(this);

        this.state = {
            shippingMethod: null,
            address: {},
            goToStripe: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCartCost());
    }

    componentWillUpdate() {
        var {error} = this.props.order;
        if (error && this.state.goToStripe) {
            this.props.updateCart();
            this.setState({goToStripe: false});
        };
    }

    // PayPal

    paypalPayment(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: {
                            total: this.getTotal(),
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

    paypalOnAuthorize(data, actions) {
        this.tokenReceived({
            type: "paypal",
            data: {
                paymentID: data.paymentID,
                payerID:   data.payerID
        }});

    }

    //

    getTotal() {
        if(this.state.shippingMethod == null)
            return null;
        return (
            this.cost.sub_total
            + this.cost.shipping[this.state.shippingMethod]
        ).toFixed(2);
    }

    checkDetails() {
        const required = [
            "name",
            "line1",
            "city",
            "county",
            "postcode"
        ];
        for (let key of required)
        {
            if(!this.state.address[key])
            {
                this.props.dispatch(newMessage(`Error: ${key} is required.`, "danger"));
                return false;
            }
        }

        return true;
    }

    paymentAbort() {
        this.setState({payment: false});
    }

    tokenReceived(token) {
        console.log('running');
        this.props.placeOrder(token, this.state.address, this.state.shippingMethod);
    }

    // Render

    renderShippingMethods() {
        return (
            <span className="pull-right">
                <b>Shipping: </b>
                <select onChange={(e) => this.setState({
                    shippingMethod: e.target.value
                })}>
                    <option disabled selected>
                        Select a delivery option.
                    </option>
                    <option value={0}>
                        Royal Mail 1st Class (1 to 2 working days)
                        £{this.cost.shipping[0].toFixed(2)}
                    </option>
                    <option value={1}>
                        Royal Mail 2nd Class (2 to 3 working days)
                        £{this.cost.shipping[1].toFixed(2)}
                    </option>
                </select>
            </span>
        );
    }

    renderShipping() {
        if(this.state.shippingMethod == null)
            return (<span />);

        const linkToAddress = linkStateFeild(this, 'address');

        return address(linkToAddress);
    }

    renderTotal() {
        var total = this.getTotal();
        if(total == null)
            return (<span />);

        return (
            <span className="pull-right">
                <b>Total: </b>£{total}
            </span>
        );
    }

    renderPaymentMethods() {
        if (this.state.shippingMethod == null)
            return <span />;

        return !this.state.goToStripe ? (<span className="pull-right" id="payment-options">
            <PayPalButton client={paypalClient}
                         payment={this.paypalPayment}
                         commit={true}
                         onAuthorize={this.paypalOnAuthorize}
                         env={'sandbox'}/>
            <span className="space" />
            <a className="button is-primary pull-right"
               onClick={e => this.setState({goToStripe: true})}>
                Pay with Card
            </a>
        </span> ) : ( <Stripe onClose={this.paymentAbort}
                getTotal={this.getTotal}
                tokenReceived={this.tokenReceived}/> );
    }

    renderStripe() {
        return true ? (<span />) : (!this.state.goToStripe ? (
            <a className="button is-primary pull-right"
               onClick={e => {
                    if (this.checkDetails())
                        this.setState({goToStripe: true})
            }}>
                Place Order
            </a>
        ) : (
            <Stripe onClose={this.paymentAbort}
                    getTotal={this.getTotal}
                    tokenReceived={this.tokenReceived}/>
        ));
    }

    render() {
        if(this.props.cart.costError)
            alert(this.props.cart.costError);
        if(!this.props.cart.costFetched)
            return (<Loading />);

        this.cost = this.props.cart.cost.data;

        return (
            <div>
                <br/>
                <span className="pull-right">
                    <b>Subtotal: </b>£{this.cost.sub_total.toFixed(2)}
                </span>
                <br/>
                {this.renderShippingMethods()}
                <br />
                <br />
                {this.renderShipping()}
                <hr />
                {this.renderTotal()}
                <br />
                {this.renderPaymentMethods()}
                {this.renderStripe()}
            </div>
        );
    }
}

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
    }

    componentDidMount() {
        this.props.dispatch(fetchAll());
        this.props.dispatch(fetchCart());
    }

    placeOrder(card_token, address, shipping_method){
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
