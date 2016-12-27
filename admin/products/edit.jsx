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


import ProductEditCategories from './edit_categories';
import './edit.scss';

var ProductEditDetailsForm = (props) => (
    <div>
    <Title>Details</Title>
    <form className="product-details">
        <div className="input-row">
            <label htmlFor="name">Name:&nbsp;&nbsp;</label>
            <input name="name"
                   type="text"
                   defaultValue={props.data.name}/>
        </div>

        <div className="input-row">
            <label htmlFor="price">Price (£):&nbsp;&nbsp;</label>
            <input name="price"
                   type="number"
                   defaultValue={props.data.cost}/>
        </div>


        <div className="input-row">
            <label htmlFor="description">Description:&nbsp;&nbsp;</label>
            <textarea name="description"
                   type="text"
                   defaultValue={props.data.description}/>
        </div>

        <ControlButton className="is-primary" type="submit">
        Save
        </ControlButton>
    </form>
    </div>
);



class ProductEditImages extends Component {
    handleChange(event) {
        console.log('Selected file:', event.target.files[0]);
    }

    render() {

        return (
            <div>

            <Title>Images</Title>
            <form className="input-row">
                <label htmlFor="thumbnail">Thumbnail:&nbsp;&nbsp;</label>
                <input className="image-input"
                       name="thumbnail"
                       type="file"
                       onChange={this.handleChange}
                       accept=".jpg"/>
                <ControlButton className="is-primary" type="submit">
                Save
                </ControlButton>
            </form>
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
            </div>
        );
    }
}

const ProductEditStock = (props) => (
    <div>
        <Title>Stock</Title>
        <span className="is-2">Current Stock level: {props.data.stock}</span>
        <pre className="stock-warning">WARNING: Stock level is only updated on reload (order may
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

const ProductEditViewControl = (props) => {
    const active = props.data.active ? (
        <div>
            <span className="input-row">
                This product is currently <b>active</b>. It can be viewed and ordered by customers.
            </span>
            <br />
            <Button className="is-primary">Deactivate</Button>
        </div>
    ) : (
        <div>
            <span className="input-row">
                This product is currently <b>not active</b>. It is not visible to customers.
            </span>
            <br />
            <Button className="is-primary">Activate</Button>
        </div>
    );

    const productId = props.data._id.$oid;

    return (
        <div>
            <Title>View</Title>
            {active}
            <br />
            You can preview this product in the admin area&nbsp;
            <Link to={`/products/${productId}`}> here</Link>. <br />
            (<b>WARNING:</b> Make sure you save any changes!)
        </div>
    );
}


const ProductEdit = (props) => {
    var onCategoriesLoad  = (productDetails) => (categories) => (
        <ProductEditCategories data={productDetails}
                               suggestions={categories}/>
    );

    var onLoad = (productDetails) => (
        <div>
            <Title>Editing Product ({productDetails._id.$oid})</Title>
            <Section>
                <ProductEditDetailsForm data={productDetails} />
                <hr />
                <LoadCategories onLoad={onCategoriesLoad(productDetails)}/>
                <hr />
                <ProductEditImages />
                <hr />
                <ProductEditStock data={productDetails}/>
                <hr />
                <ProductEditViewControl data={productDetails} />
            </Section>
        </div>
    );

    return <LoadProduct productId={props.params.productId}
                        onLoad={onLoad} />;
};

export default ProductEdit;
