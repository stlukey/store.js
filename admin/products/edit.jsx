import React, {Component} from 'react';
import ProductPage from '../../src/products/view';
import {Link} from 'react-router';
import {
    reduxForm,
    Feild
} from 'redux-form';
import ReactTags from 'react-tag-autocomplete';
import 'react-tag-autocomplete/example/styles.css';
import './edit.scss';

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

var ProductEditDetailsForm = (props) => (
    <div>
    <Title>Details</Title>
    <form className="product-details">
        <div>
            <label htmlFor="name">Name:&nbsp;&nbsp;</label>
            <input name="name"
                   type="text"
                   defaultValue={props.data.name}/>
        </div>

        <div>
            <label htmlFor="price">Price (£):&nbsp;&nbsp;</label>
            <input name="price"
                   type="number"
                   defaultValue={props.data.cost}/>
        </div>


        <div>
            <label htmlFor="description">Description:&nbsp;&nbsp;</label>
            <textarea name="description"
                   type="text"
                   defaultValue={props.data.description}/>
        </div>

        <br />
        <ControlButton className="is-primary" type="submit">
        Save
        </ControlButton>
    </form>
    </div>
);

const makeCategoryId = (name) => name.toLowerCase().replace(' ', '-');

function makeTags(categories){
    if(categories instanceof Array) {
        var names = categories;
        categories = {};
        for(var i in names)
            categories[makeCategoryId(names[i])] = names[i];
    }
    
    var tags = [];
    for(var id in categories)
        tags.push({id:id, name: categories[id]});

    return tags;
}

class ProductEditCategories extends Component {
    constructor(props) {
        super(props);
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);

        this.state = {
            tags: makeTags(props.data.categories),
            suggestions: makeTags(props.suggestions),
        };
    }

    handleDelete(i) {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        var tags = this.state.tags;
        tags.push(tag);
        this.setState({tags: tags});
    }

    render() {
        return (
            <div>
                <Title>Categories</Title>
                <ReactTags tags={this.state.tags}
                           suggestions={this.state.suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           allowNew={true}
                           placeholder="Add new Category" />
                <br />
                <Button className="is-primary">Save</Button>
            </div>
        );
    }
}

const ProductEditImages = (props) => (
    <Title>Images</Title>
);

const ProductEditStock = (props) => (
    <Title>Stock</Title>
);

const ProductEditViewControl = (props) => (
    <Title>View</Title>
);


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
                <ProductEditStock />
                <hr />
                <ProductEditViewControl />
            </Section>
        </div>
    );

    return <LoadProduct productId={props.params.productId}
                        onLoad={onLoad} />;
};

export default ProductEdit;
