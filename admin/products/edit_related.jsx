import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    saveProduct,
    saveRelated,
    deleteRelated
} from './actions';

import {
    Title,
    Button
} from '../../src/app/bulma';
import Loading from '../../src/app/loading';

import {fetchAll} from './actions';

import linkState from '../../src/helpers/linkState';
import getId from '../../src/helpers/getId';


const RelatedProduct = ({related, onDelete}) => {
    var header = (
        <span className="card-header-title">
            {related.name}
        </span>
    );

    var content = (
        <img className="related-image" src={`${API_URL}${related.images[0]}`} />
    );

    return (
        <div className="card is-fullwidth input-row">
            <header className="card-header">
                {header}
            </header>
            <div className="card-content">
                {content}
            </div>
            <footer className="card-footer">
                <a className="card-footer-item"
                    onClick={onDelete}>Delete</a>
            </footer>
        </div>
    );
};

class AddRelated extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        
        this.state = {
            product: null
        }
    }

    onChange(e) {
        this.setState({'product': e.target.value});
    }

    render() {
        window.state = this.state;
        const selectItems = this.props.products.map(
            (product, i) => getId(product) == getId(this.props.current)
                         || this.props.current.related.some(el => getId(el) == getId(product)) ?
            <option key={i} value={getId(product)} disabled>{product.name}</option>
            : <option key={i} value={getId(product)}>{product.name}</option>
        );

        return (
            <div className="card is-fullwidth input-row">
                <div className="card-content">
                    <select onChange={this.onChange} value={this.state.product}>
                        <option disabled selected value> -- select a product -- </option>
                        {selectItems}
                    </select>
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item"
                       onClick={() => this.props.onChange(this.state.product)}>
                       Save    
                    </a>
                    <a className="card-footer-item"
                       onClick={this.props.onCancel}>
                       Cancel    
                    </a>
                </footer>
            </div>
        );
    }
}

@connect((store) => {
    return {
        products: store.products.products,
    }
})
class ProductEditRelated extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this)
        this.addRelated = this.addRelated.bind(this)

        this.state = {
            related: this.props.data.related,
            displayNew: false
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchAll());
    }

    handleDelete(index){
        const product = this.state.related[index]; 
        this.props.dispatch(deleteRelated(getId(this.props.data), getId(product)));
    }

    addRelated(relatedProductId) {
        this.props.dispatch(saveRelated(getId(this.props.data), relatedProductId));
    }


    render() {
        if (this.props.products.error)
            alert(this.props.products.error);

        if (!this.props.products.fetched || !this.state.related)
            return <Loading />;

        window.data = this.props.data;
        
        const cancelAdd = () => this.setState({displayNew: !this.state.displayNew});
        
        var related = this.state.related.map((related, index) => (
            <RelatedProduct related={related}
                            onDelete={() => this.handleDelete(index)} />
        ));

        var addRelated = this.state.displayNew ? 
            <AddRelated onChange={this.addRelated}
                       onCancel={cancelAdd}
                       products={this.props.products.products.data}
                       current={this.props.data}/> : <span />;

        var buttons = !this.state.displayNew ?
            <span>
                <Button onClick={cancelAdd}>
                    Add New Related Product
                </Button>
            </span> : <span />;

        return (
            <div>
                <Title>Related</Title>
                {related}
                {addRelated}
                {buttons}
            </div>
        );
    }
}

export default ProductEditRelated;
