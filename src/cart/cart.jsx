import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';

import Loading from '../app/loading';

import {
    fetchCart, fetchCartCost,
    removeFromCart, setItemQuantityInCart
} from './actions';
import {fetchAll} from '../products/actions';
import newMessage from '../messages/actions';
import {Section, Title} from '../app/bulma';

import Cards from 'react-credit-cards';
import Dialog from 'material-ui/Dialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-credit-cards/lib/styles.scss';

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

class Payment extends Component {
  state = {
    dialogOpen: false,
  };


  openDialog = (type) => {
    this.setState({
      dialogOpen: true,
    });
  };

  closeDialog = () => {
    this.setState({dialogOpen: false});
  };

  render() {
    return (
      <div>
      <MuiThemeProvider>
        <Dialog
          title="Make Payment"
          modal={true}
          open={true}
        >
          <Card />
        </Dialog>
      </MuiThemeProvider>
      </div>
    );
  }
}

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
const findProduct = (item, products) => {
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
class CartCost extends Component {
    constructor(props) {
        super(props);
        this.goToCheckout = this.goToCheckout.bind(this);

        this.state = {
            shippingMethod: null,
            address: {},
            checkOut: false
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchCartCost());
    }

    renderTotal() {
        if(this.state.shippingMethod == null)
            return (<span />)

        var total = this.cost.sub_total + this.cost.shipping[this.state.shippingMethod];
        return (
            <span className="pull-right">
                <b>Total: </b>£{total.toFixed(2)}
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

    goToCheckout() {
        if(!this.checkDetails())
            return false;
        this.setState({checkOut: true});
    }

    renderCheckout() {
        return this.state.shippingMethod == null ? (<span />) : (!this.state.checkOut ? (
            <a className="button is-primary pull-right" onClick={this.goToCheckout}>
                Place Order
            </a>
          ) : (<Payment />));
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
                {this.renderCheckout()}
            </div>
        );
    }
}

@connect((store) => {
    return {
        cart: store.cart,
        products: store.products
    }
})
class Cart extends Component {
    componentDidMount() {
        this.props.dispatch(fetchAll());
        this.props.dispatch(fetchCart());
    }


    render() {
        if(this.props.cart.error)
            return alert(this.props.cart.error);
        if(!this.props.cart.fetched)
            return (<Loading />);



        var empty = Object.keys(this.props.cart.products.data).length == 0;
        var contents = empty ? (
            <span>Empty.</span>
        ) : (
            <CartTable />
        );

        return (
            <Section>
                <Title>Items in your Basket</Title>
                {contents}
                <CartCost />
            </Section>
        );
    }
}

export default Cart;
