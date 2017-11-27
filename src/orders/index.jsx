import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
    Section, Title, Columns
} from '../app/bulma';

import {fetchAll} from '../products/actions';
import fetchOrder from './actions';
import {findProduct} from '../cart/carttable';

import Loading from '../app/loading';

import "../cart/cart.scss";

const Item = (props) => {
    var product = findProduct(props.productId, props.productsData);
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
            <td>{props.quantity}</td>
        </tr>
    );
};

const ItemsTable = (props) => (
    <table className="table cart-table">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(props.orderItems).map((item, i) => (
                    <Item productId={item}
                          productsData={props.productsData}
                          quantity={props.orderItems[item]}
                          key={i} />
            ))}
        </tbody>
    </table>
);

const Detail = (props) => (
    <div className="column card">
        <header className="card-header">
            <p className="card-header-title">
                {props.title}
            </p>
        </header>
        <div className="card-content">
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
)

const Address = (props) => (
    <div>
        <div>{props.details['name']}</div>
        <div>{props.details['line1']}</div>
        <div>{props.details['line2']}</div>
        <div>{props.details['line3']}</div>
        <div>{props.details['city']}</div>
        <div>{props.details['county']}</div>
        <div>{props.details['postcode']}</div>
    </div>
)

export const OrderView = (props) => (
    <Section>
        <Title>
            <b>Order</b>
            {" "}<Link to={"/orders/" + props.orderData._id.$oid}>#{props.orderData._id.$oid}</Link>
        </Title>
        <Section>
            <Title>Details</Title>
            {props.summary ? (<span />) :
                (
                    <div className="columns">
                        <Detail title="Email">
                        {props.orderData.user}
                        </Detail>
                        <Detail title="Status">
                            {props.orderData.status}
                        </Detail>
                    </div>
                )
            }
            <div className="columns">
                <Detail title="Shipping Address">
                    <Address details={props.orderData.shipping.address} />
                </Detail>
                <Detail title="Shipping Method">
                    <span>{props.orderData.shipping.method == 0 ?
                        "Royal Mail 1st Class (1 to 2 working days)" : "Royal Mail 2nd Class (2 to 3 working days)" }</span>
                </Detail>
            </div>
            <div className="columns">
                <Detail title="Date & Time">
                    {new Date(props.orderData.datetime.$date).toString()}
                </Detail>
                <Detail title="Paid">
                    £{props.orderData.payment.amount / 100}
                </Detail>
            </div>
        </Section>
        <Section>
            <Title>Contents</Title>
            <ItemsTable orderItems={props.orderData.items}
                        productsData={props.productsData} />
        </Section>
    </Section>
);

@connect((store) => {
    return {
        products: store.products.products,
        order: store.order
    }
})
class Order extends Component {
    componentDidMount() {
        this.props.dispatch(fetchAll());
        this.props.dispatch(fetchOrder(this.props.params.orderId));
    }

    render() {
        if(this.props.order.error)
            return alert(this.props.order.error);
        if(this.props.products.error)
            return alert(this.props.products.error);

        if(!this.props.order.fetched || !this.props.products.fetched)
            return (<Loading />);

        return (
            <OrderView productsData={this.props.products.products.data}
                       orderData={this.props.order.data} />
        );
    }
}

export default Order;
