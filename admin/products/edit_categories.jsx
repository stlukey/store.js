import React, {Component} from 'react';
import ReactTags from 'react-tag-autocomplete';
import 'react-tag-autocomplete/example/styles.css';

import {
    Title,
    Button
} from '../../src/app/bulma';

import {saveProduct} from './actions';

// Convert ccategory name to ID
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
        this.save = this.save.bind(this);

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

    save() {
        const productId = this.props.data._id.$oid;

        var ids = [];
        for(var i in this.state.tags)
            ids.push(makeCategoryId(this.state.tags[i].name));
        const data = {category_ids: ids};

        this.props.dispatch(saveProduct(productId,
                                        data))
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
                           placeholder="Add new Category"
                           className="input-row"/>
                <Button className="is-primary"
                        onClick={this.save}>Save</Button>
            </div>
        );
    }
}

export default ProductEditCategories;
