import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost,
    removeFromCart, setItemQuantityInCart
} from './actions';
import {fetchAll} from '../products/actions';
import newMessage from '../messages/actions';


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
                <td className="cart-image"><figure className="image is-64x64">
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

export default CartTable;
