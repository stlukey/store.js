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

import linkState from '../../src/helpers/linkState';


@connect((store) => {
    return {
        product: store.products.product
    }
})
class NewProduct extends Component {
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

    renderModal() {
        var classes = classnames('modal', {'is-active': this.state.active});
        return (<div className={classes}>
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
                           value={this.state.name}
                           onChange={linkState(this, 'name')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="price">
                        Price (£):&nbsp;&nbsp;
                    </label>
                    <input name="price"
                           type="number"
                           value={this.state.cost}
                           onChange={linkState(this, 'cost')} />
                </div>


                <div className="input-row">
                    <label htmlFor="description">
                        Description:&nbsp;&nbsp;
                    </label>
                    <textarea name="description"
                        type="text"
                        value={this.state.description}
                        onChange={linkState(this, 'description')} />
                </div>

                <hr/>

                <div className="input-row">
                    <label htmlFor="width">
                        Width (cm):&nbsp;&nbsp;
                    </label>
                    <input name="width"
                           type="number"
                           value={this.state.width}
                           onChange={linkState(this, 'width')} />
                </div>

                <div className="input-row">
                    <label htmlFor="depth">
                        Depth (cm):&nbsp;&nbsp;
                    </label>
                    <input name="depth"
                           type="number"
                           value={this.state.depth}
                           onChange={linkState(this, 'depth')} />
                </div>

                <div className="input-row">
                    <label htmlFor="length">
                        Length (cm):&nbsp;&nbsp;
                    </label>
                    <input name="length"
                           type="number"
                           value={this.state.length}
                           onChange={linkState(this, 'length')} />
                </div>

                <div className="input-row">
                    <label htmlFor="weight">
                        Weight (kg):&nbsp;&nbsp;
                    </label>
                    <input name="weight"
                           type="number"
                           value={this.state.weight}
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
        </div>);
    }

    render() {
        return <NewProductRow onClick={this.activate()}>
            {this.renderModal()}
        </NewProductRow>;
    }
}
NewProduct = withRouter(NewProduct);


const NewProductRow = ({children, onClick}) =>(
    <tr className="product-row new-product-row">
        <td onClick={onClick}><Icon className="large-icon">add</Icon></td>
        <td className="medium-icon"
            onClick={onClick}>Add new product.</td>
        <td>
            {children}
        </td>
        <td></td>
        <td></td>
    </tr>
);

const NewProductButton = ({onClick}) => (
        <a href="#" onClick={onClick} className="button is-primary"
           width="100%">New Product</a>
);




const Products = (products, newProduct) => (
    <table className="table">
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
            <NewProduct onClick={newProduct} />
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
