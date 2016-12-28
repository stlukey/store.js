import React, {Component} from 'react';
import {Link} from 'react-router';

import {
    Title,
    Section,
    ControlButton,
    Button
} from '../../src/app/bulma';

import LoadProduct, {
    LoadCategories
} from '../../src/products/load';

import {saveProduct, uploadImage} from './actions';
import newMessage from '../../src/messages/actions';


import ProductEditCategories from './edit_categories';
import ProductEditImages from './edit_images';
import ProductEditRecipes from './edit_recipes';

import './edit.scss';

const linkState = (obj, key) => (e) => {
    var state = obj.state;
    state[key] = e.target.value;
    obj.setState(state)
}

class ProductEditDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.state = {};
    }

    save() {
        const productId = this.props.data._id.$oid;
        this.props.dispatch(saveProduct(productId,
                                        this.state));
    }

    render() {
        return (
            <div>
                <Title>Details</Title>
                <div className="input-row">
                    <label htmlFor="name">
                        Name:&nbsp;&nbsp;
                    </label>
                    <input name="name"
                           type="text"
                           defaultValue={this.props.data.name}
                           onChange={linkState(this, 'name')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="price">
                        Price (£):&nbsp;&nbsp;
                    </label>
                    <input name="price"
                           type="number"
                           onChange={linkState(this, 'cost')}
                           defaultValue={this.props.data.cost}/>
                </div>


                <div className="input-row">
                    <label htmlFor="description">
                        Description:&nbsp;&nbsp;
                    </label>
                    <textarea name="description"
                        type="text"
                        onChange={linkState(this, 'description')}
                        defaultValue={this.props.data.description}/>
                </div>

                <Button className="is-primary" onClick={this.save}>
                Save
                </Button>
            </div>
        );
    }
}

class ProductEditStock extends Component {
    constructor(props) {
        super(props);

        this.saveIncrease = this.saveIncrease.bind(this);
        this.saveDecrease = this.saveDecrease.bind(this);
        this.saveSet = this.saveSet.bind(this);
        
        this.state = {
            'increase': 0,
            'decrease': 0,
            'set': props.data.stock
        };
    }

    handleChange = (target) => (event) => {
        var state = this.state;
        state[target] = event.target.value;
        this.setState(state);

    }

    saveIncrease(event) {
        const productId = this.props.data._id.$oid;
        const data = {stock: this.state.increase,
                      $inc: true};

        this.props.dispatch(saveProduct(productId,
                                        data));
    }

    saveDecrease(event) {
        const productId = this.props.data._id.$oid;
        const data = {stock: -this.state.decrease,
                      $inc: true};

        this.props.dispatch(saveProduct(productId,
                                        data));
    }

    saveSet(event) {
        const productId = this.props.data._id.$oid;
        const data = {stock: this.state.set};

        console.log('saving');

        this.props.dispatch(saveProduct(productId,
                                        data));
    }

    render() {
        return (
    <div>
        <Title>Stock</Title>
        <span className="is-2">
            Current Stock level: {this.props.data.stock}
        </span>
        <pre className="stock-warning">
            WARNING: Stock level is only updated on reload (orders
                     may take place while on this page if product is
                     active). If the product is active it is advised
                     that you Increase/Decrease the stock level as
                     opossed to setting it.
        </pre>
            <div className="input-row">
                <label htmlFor="increase">
                    Increase by:&nbsp;&nbsp;
                </label>
                <input name="increase"
                       type="number"
                       onChange={this.handleChange('increase')} />
                <Button className="is-primary" type="submit"
                        onClick={this.saveIncrease}>
                    Save
                </Button>
            </div>
            <div className="input-row">
                <label htmlFor="decrease">
                    Decrease by:&nbsp;&nbsp;
                </label>
                <input name="decrease"
                       type="number"
                       onChange={this.handleChange('decrease')} />
                <Button className="is-primary" type="submit"
                        onClick={this.saveDecrease}>
                Save
                </Button>
            </div>
            <div className="input-row">
                <label htmlFor="set-stock">Set:&nbsp;&nbsp;</label>
                <input name="set-stock"
                       type="number"
                       onChange={this.handleChange('set')}
                       defaultValue={this.props.data.stock} />
                <Button className="is-primary" type="submit"
                        onClick={this.saveSet}>
                Save
                </Button>
            </div>
    </div>
    );}
}

class ProductEditViewControl extends Component {
    constructor(props) {
        super(props);
        
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView() {
        const productId = this.props.data._id.$oid;
        const data = {active: !this.props.data.active};

        this.props.dispatch(saveProduct(productId,
                                        data));
    }

    render() {
        const active = this.props.data.active ? (
            <div>
                <span className="input-row">
                    This product is currently <b>active</b>.
                    It can be viewed and ordered by customers.
                </span>
                <br />
                <Button className="is-primary"
                        onClick={this.toggleView}>Deactivate</Button>
            </div>
        ) : (
            <div>
                <span className="input-row">
                    This product is currently <b>not active</b>.
                    It is not visible to customers.
                </span>
                <br />
                <Button className="is-primary"
                        onClick={this.toggleView}>Activate</Button>
            </div>
        );

        return (
            <div>
                <Title>View</Title>
                {active}
                <br />
                You can preview this product in the admin area&nbsp;
                <PreviewLink product={this.props.data}>
                    here
                </PreviewLink> <br />
                <SaveWarning />
            </div>
        );
    }
}

const PreviewLink = (props) => (
    <Link to={`/products/${props.product._id.$oid}`}>
        {props.children}
    </Link>
);

const SaveWarning = (props) => (
    <span>
        <b>WARNING:</b> Make sure you save any changes!
    </span>
);

const ProductEdit = (props) => {
    var onCategoriesLoad  = (productDetails, dispatch) => (categories) => (
        <ProductEditCategories data={productDetails}
                               suggestions={categories}
                               dispatch={dispatch}/>
    );

    var onLoad = (productDetails, dispatch) => (
        <div>
            <Title>Editing Product (
                <PreviewLink product={productDetails}>
                    Preview
                </PreviewLink>
            )</Title>
            <SaveWarning />
            <Section>
                <ProductEditDetailsForm data={productDetails}
                                        dispatch={dispatch} />
                <hr />
                <LoadCategories onLoad={onCategoriesLoad(productDetails,
                                                         dispatch)} />
                <hr />
                <ProductEditImages dispatch={dispatch}
                                   data={productDetails}/>
                <hr />
                <ProductEditRecipes data={productDetails}
                                    dispatch={dispatch}/>
                <hr />
                <ProductEditStock data={productDetails}
                                  dispatch={dispatch}/>
                <hr />
                <ProductEditViewControl data={productDetails}
                                        dispatch={dispatch} />
            </Section>
        </div>
    );

    return <LoadProduct productId={props.params.productId}
                        onLoad={onLoad} />;
};

export default ProductEdit;
