import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {withRouter} from 'react-router';

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

        var cartItems = this.props.cart.products;

        return (
            <table className="table">
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


@connect((store) => {
    return {
        cart: store.cart,
    }
})
class FinalDetails extends Component {
    constructor(props) {
        super(props);
        this.goToPayment = this.goToPayment.bind(this);
        this.paymentAbort = this.paymentAbort.bind(this);
        this.getTotal = this.getTotal.bind(this);
        this.tokenReceived = this.tokenReceived.bind(this);

        this.state = {
            shippingMethod: null,
            address: {},
            payment: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCartCost());
    }

    getTotal() {
        if(this.state.shippingMethod == null)
            return null;
        return (
            this.cost.sub_total
            + this.cost.shipping[this.state.shippingMethod]
        ).toFixed(2);
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

    renderShipping() {
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

    renderAddress() {
        if(this.state.shippingMethod == null)
            return (<span />)

        const linkToAddress = linkStateFeild(this, 'address');

        return (
            <form>
                <Title>Address Details</Title>
                <div className="input-row">
                    <label htmlFor="name">
                        Name:&nbsp;&nbsp;
                    </label>
                    <input name="name"
                           type="text"
                           onChange={linkToAddress('name')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="line1">
                        Line 1:&nbsp;&nbsp;
                    </label>
                    <input name="line1"
                           type="text"
                           onChange={linkToAddress('line1')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="line2">
                        Line 2:&nbsp;&nbsp;
                    </label>
                    <input name="line2"
                           type="text"
                           onChange={linkToAddress('line2')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="line3">
                        Line 3:&nbsp;&nbsp;
                    </label>
                    <input name="line3"
                           type="text"
                           onChange={linkToAddress('line3')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="city">
                        City:&nbsp;&nbsp;
                    </label>
                    <input name="city"
                           type="text"
                           onChange={linkToAddress('city')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="county">
                        County:&nbsp;&nbsp;
                    </label>
                    <input name="county"
                           type="text"
                           onChange={linkToAddress('county')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="name">
                        Postcode:&nbsp;&nbsp;
                    </label>
                    <input type="text"
                           onChange={linkToAddress('postcode')}/>
                </div>
            </form>
        );
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
                this.props.dispatch(newMessage(`Error: ${key} is required.`, "error"));
                return false;
            }
        }

        return true;
    }

    goToPayment() {
        if(!this.checkDetails())
            return false;
        this.setState({payment: true});
    }

    paymentAbort() {
        this.setState({payment: false});
    }

    tokenReceived(token) {
        this.props.placeOrder(token, this.state.address, this.state.shippingMethod);
    }

    renderPayment() {
        return this.state.shippingMethod == null ? (<span />) : (!this.state.payment ? (
            <a className="button is-primary pull-right" onClick={this.goToPayment}>
                Place Order
            </a>
        ) : (<Payment onClose={this.paymentAbort} getTotal={this.getTotal} tokenReceived={this.tokenReceived}/>));
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
                {this.renderShipping()}
                <br />
                <br />
                {this.renderAddress()}
                <hr />
                {this.renderTotal()}
                <br />
                {this.renderPayment()}
            </div>
        );
    }
}

@connect((store) => {
    return {
        cart: store.cart,
        products: store.products,
        order: store.order
    }
})
class Cart extends Component {
    constructor(props) {
        super(props);
        this.placeOrder = this.placeOrder.bind(this);
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
        this.props.dispatch(placeOrder(data)).then(() => {
            this.props.router.push('/orders/' + this.props.order.data._id.$oid);
        });;
    }

    render() {
        if(this.props.cart.error)
            return alert(this.props.cart.error);
        if(!this.props.cart.fetched)
            return (<Loading />);

        var empty = Object.keys(this.props.cart.products.data).length == 0;

        return (
            <Section>
                <Title>Items in your Basket</Title>
                {empty ? (
                    <span>Empty.</span>
                ) : (
                    <span>
                        <CartTable />
                        <FinalDetails placeOrder={this.placeOrder}
                                      key={window.orders} />
                    </span>
                )}
            </Section>
        );
    }
}

export default withRouter(Cart);
