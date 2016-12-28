import React, {Component} from 'react';
import ProductPage from '../../src/products/view';
import {Link} from 'react-router';
import {
    reduxForm,
    Feild
} from 'redux-form';
import FileInput from 'react-file-input';

import {
    Title,
    Section,
    pCommmand,
    ControlButton,
    Button
} from '../../src/app/bulma';

import LoadProduct, {
    LoadCategories
} from '../../src/products/load';

import {saveProduct} from './actions';


import ProductEditCategories from './edit_categories';
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
                    <label htmlFor="name">Name:&nbsp;&nbsp;</label>
                    <input name="name"
                           type="text"
                           defaultValue={this.props.data.name}
                           onChange={linkState(this, 'name')}/>
                </div>

                <div className="input-row">
                    <label htmlFor="price">Price (£):&nbsp;&nbsp;</label>
                    <input name="price"
                           type="number"
                           onChange={linkState(this, 'cost')}
                           defaultValue={this.props.data.cost}/>
                </div>


                <div className="input-row">
                    <label htmlFor="description">Description:&nbsp;&nbsp;</label>
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



class ProductEditImages extends Component {
    handleChange(event) {
        console.log('Selected file:', event.target.files[0]);
    }

    render() {

        const homeImage = this.props.data.images.length ? (
            <form className="input-row">
                <label htmlFor="home-image">Home Image:&nbsp;&nbsp;</label>
                <input className="image-input"
                       name="home-image"
                       type="file"
                       onChange={this.handleChange}
                       accept=".jpg"/>
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
        ) : (
            <form className="input-row">
                <label htmlFor="home-image">Home Image:&nbsp;&nbsp;</label>
                <span>You must upload a main image first.</span>
            </form>
        );

        return (
            <div>

            <Title>Images</Title>
            <form className="input-row">
                <label htmlFor="main-image">Main Image:&nbsp;&nbsp;</label>
                <input className="image-input"
                       name="main-image"
                       type="file"
                       onChange={this.handleChange}
                       accept=".jpg"/>
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
            {homeImage}
            </div>
        );
    }
}

var columns = [{name: 'name'},{name: 'url'}];

class ProductEditRecipes extends Component {
    render() {
        return (
            <div>
                <Title>Recipes</Title>
                <Button className="is-primary">Save</Button>
            </div>
        );
    }
}


const ProductEditStock = (props) => (
    <div>
        <Title>Stock</Title>
        <span className="is-2">Current Stock level: {props.data.stock}</span>
        <pre className="stock-warning">
                WARNING: Stock level is only updated on reload (orders may
                         take place while on this page if product is active).
                         If the product is active it is advised that you
                         Increase/Decrease the stock level as opossed to setting it.
        </pre>
            <form className="input-row">
                <label htmlFor="increase">Increase by:&nbsp;&nbsp;</label>
                <input name="increase"
                       type="number" />
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
            <form className="input-row">
                <label htmlFor="decrease">Decrease by:&nbsp;&nbsp;</label>
                <input name="decrease"
                       type="number" />
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
            <form className="input-row">
                <label htmlFor="set-stock">Set:&nbsp;&nbsp;</label>
                <input name="set-stock"
                       type="number"
                       defaultValue={props.data.stock} />
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
    </div>
);

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
                    This product is currently <b>active</b>. It can be viewed and ordered by customers.
                </span>
                <br />
                <Button className="is-primary"
                        onClick={this.toggleView}>Deactivate</Button>
            </div>
        ) : (
            <div>
                <span className="input-row">
                    This product is currently <b>not active</b>. It is not visible to customers.
                </span>
                <br />
                <Button className="is-primary"
                        onClick={this.toggleView}>Activate</Button>
            </div>
        );

        const productId = this.props.data._id.$oid;

        return (
            <div>
                <Title>View</Title>
                {active}
                <br />
                You can preview this product in the admin area&nbsp;
                <Link to={`/products/${productId}`}>here</Link>. <br />
                (<b>WARNING:</b> Make sure you save any changes!)
            </div>
        );
    }
}

const ProductEdit = (props) => {
    var onCategoriesLoad  = (productDetails, dispatch) => (categories) => (
        <ProductEditCategories data={productDetails}
                               suggestions={categories}
                               dispatch={dispatch}/>
    );

    var onLoad = (productDetails, dispatch) => (
        <div>
            <Title>Editing Product ({productDetails._id.$oid})</Title>
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
