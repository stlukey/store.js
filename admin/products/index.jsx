import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classnames from 'classnames';

import {
    Title,
    Section,
} from '../../src/app/bulma';
import Loading from '../../src/app/loading';
import Icon from '../../src/app/icon';

import {fetchAll, createProduct} from './actions';
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

const linkState = (obj, key) => (e) => {
    var state = obj.state;
    state[key] = e.target.value;
    obj.setState(state)
}

@connect((store) => {
    return {
        product: store.products.product
    }
})
class NewProductRow extends Component {
    constructor(props) {
        super(props);
        this.activate = this.activate.bind(this);
        this.create = this.create.bind(this);
        this.goToProductEdit = this.goToProductEdit.bind(this);

        this.state = {
            active: false,
            name: null,
            cost: null,
            description: null,

            width: null,
            depth: null,
            length: null,
            weight: null
        };

        this.i = 0;
    }

    activate = (value=true) => () => {
        var state = this.state;
        state.active = value;
        this.setState(state);
    }

    goToProductEdit() {
        const productId = this.props.product.data.data._id.$oid;
        this.props.router.push(`/products/${productId}/edit`);
    }

    create() {
        const data = {
            name:this.state.name,
            cost:this.state.cost,
            description:this.state.description,
            width: this.state.width,
            depth: this.state.depth,
            length: this.state.length,
            weight: this.state.weight
        };

        this.props.dispatch(createProduct(data))
                  .then(this.goToProductEdit);
    }

    render() {
        var classes = classnames('modal', {'is-active': this.state.active});

        return (
        <tr className="product-row new-product-row">
            <td onClick={this.activate()}><Icon className="large-icon">add</Icon></td>
            <td className="medium-icon"
                onClick={this.activate()}>Add new product.</td>
            <td>
                <div className={classes}>
                  <div className="modal-background"></div>
                  <div className="modal-card">
                    <header className="modal-card-head">
                      <p className="modal-card-title">New Product</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="input-row">
                            <label htmlFor="name">
                                Name:&nbsp;&nbsp;
                            </label>
                            <input name="name"
                                   type="text"
                                   onChange={linkState(this, 'name')}/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="price">
                                Price (£):&nbsp;&nbsp;
                            </label>
                            <input name="price"
                                   type="number"
                                   onChange={linkState(this, 'cost')} />
                        </div>


                        <div className="input-row">
                            <label htmlFor="description">
                                Description:&nbsp;&nbsp;
                            </label>
                            <textarea name="description"
                                type="text"
                                onChange={linkState(this, 'description')} />
                        </div>

                        <hr/>

                        <div className="input-row">
                            <label htmlFor="width">
                                Width (cm):&nbsp;&nbsp;
                            </label>
                            <input name="width"
                                   type="number"
                                   onChange={linkState(this, 'width')} />
                        </div>

                        <div className="input-row">
                            <label htmlFor="depth">
                                Depth (cm):&nbsp;&nbsp;
                            </label>
                            <input name="depth"
                                   type="number"
                                   onChange={linkState(this, 'depth')} />
                        </div>

                        <div className="input-row">
                            <label htmlFor="length">
                                Length (cm):&nbsp;&nbsp;
                            </label>
                            <input name="length"
                                   type="number"
                                   onChange={linkState(this, 'length')} />
                        </div>

                        <div className="input-row">
                            <label htmlFor="weight">
                                Weight (kg):&nbsp;&nbsp;
                            </label>
                            <input name="weight"
                                   type="number"
                                   onChange={linkState(this, 'weight')} />
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                      <a className="button is-primary"
                         onClick={this.create}>Create</a>
                      <a className="button"
                         onClick={this.activate(false)}>Cancel</a>
                    </footer>
                  </div>
                </div>
            </td>
            <td></td>
            <td></td>
        </tr>
    );}
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
