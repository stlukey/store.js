import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost, addToCart,
    removeFromCart, setItemQuantityInCart
} from './actions';
import {fetchAll} from '../products/actions';
import newMessage from '../messages/actions';
import {RequiresLogin} from '../token/login';
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

@connect()
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


const findProduct = (item, products) => {
    for(var i in products) {
        if(products[i]._id.$oid === item) {
            return products[i];
        }
    }
    console.log(`ERROR: product with id '${item}' not found.`)
}


@connect((store) => {
    return {
        cart: store.cart,
        products: store.products.products
    }
})
class CartTable extends Component {
    componentDidMount() {
        if(!this.props.products.fetched || this.props.products.fetching)
            this.props.dispatch(fetchAll());
    }

    render() {
        if(!(this.props.products.fetched))
            return (<Loading />);

        var empty = Object.keys(this.props.cart.products.data).length == 0;

        return empty ? (
            <h3>Empty.</h3>
        ) : (
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
                    {Object.keys(this.props.cart.products.data).map((item, i) => (
                        <CartItem product={findProduct(item,
                                                       this.props.products.products.data)}
                                  quantity={this.props.cart.products.data[item]}
                                  key={i} />)
                    )}
                </tbody>
            </table>
        );
    }
}

@connect((store) => {
    return {
        cart: store.cart,
    }
})
class Cart extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCart());
        this.props.dispatch(fetchCartCost());
    }


    render() {
        if(this.props.cart.costError)
            alert(this.props.cart.costError);

        if(!this.props.cart.costFetched)
            return (<Loading />);

        if(this.props.cart.error)
            alert(this.props.cart.error);

        if(!(this.props.cart.fetched))
            return (<Loading />);

        var cost = this.props.cart.cost.data;
        window.test = cost;

        var total = cost.sub_total + cost.shipping[0];

        var empty = Object.keys(this.props.cart.products.data).length == 0;
        total = empty ? <div /> : (
            <div>
                <br/>
                <span className="pull-right">
                    <b>Subtotal: </b>£{cost.sub_total.toFixed(2)}
                </span>
                <br/>
                <span className="pull-right">
                    <b>Shipping: </b>£{cost.shipping[0].toFixed(2)}
                </span>
                <br />
                <hr />

                <span className="pull-right">
                    <b>Total: </b>£{total.toFixed(2)}
                </span>
            </div>
        );

        return (
            <Section>
                <Title>Items in your Basket</Title>
                <CartTable />
                {total}    
            </Section>
        );
    }
}

export default () => (
    <RequiresLogin>
        <Cart />
    </RequiresLogin>
);



