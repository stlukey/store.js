import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {
    Title,
    Section,
} from '../../src/app/bulma';
import Loading from '../../src/app/loading';
import Icon from '../../src/app/icon';

import {fetchAll} from './actions';
import './products.scss';


class ProductRow extends Component {
    constructor(props) {
        super(props);

        this.goToProductEdit = this.goToProductEdit.bind(this);
    }

    goToProductEdit() {
        const productId = this.props.product._id.$oid;
        this.props.router.push(`/products/${productId}/edit`);
    }

    render() {
        const product = this.props.product;
        var columns = [];

        // Image
        columns.push(
            <figure className="image is-64x64">
                <img src={`${API_URL}${product.images[0]}`} />
            </figure>
        );

        columns.push(product.name);
        columns.push(`£${product.cost}`);
        columns.push(product.stock);
        columns.push(product.recipes.length);
        columns.push(product.active ? 'Yes' : 'No');

        columns = columns.map((content, index) =>
            <td key={index}>{content}</td>
        );

        return (
            <tr onClick={this.goToProductEdit} className="product-row">
                {columns}
            </tr>
        );
    }
}
ProductRow = withRouter(ProductRow);

class NewProductRow extends Component {
    constructor(props) {
        super(props);

        this.goToNewProduct = this.goToNewProduct.bind(this);
    }

    goToNewProduct() {
        const productId = this.props.product._id.$oid;
        this.props.router.push(`/products/${productId}`);
    }

    render = () => (
        <tr className="product-row">
            <td><Icon className="large-icon">add</Icon></td>
            <td className="medium-icon">Add new product.</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
}
NewProductRow = withRouter(NewProductRow);


const Products = (products) => (
    <table className="table" key={0}>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Recipes</th>
                <th>Active</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => 
                <ProductRow product={product} key={index} />
            )}
            <NewProductRow />
        </tbody>
    </table>
);

/**
Lists components with edit option.
Also has option for new product.
**/
@connect((store) => {
    return {
        products: store.products.products
    }
})
export default class ProductsPage extends Component {
    componentWillMount() {
        this.props.dispatch(fetchAll());
    }

    render() {
        if(this.props.products.error)
            alert(this.props.products.error);

        var products = this.props.products.fetched ?
            Products(this.props.products.products.data): <Loading />;

        return (
            <div>
                <Title>Products</Title>
                <Section>
                    {products}
                </Section>
            </div>
        );
    }
}

