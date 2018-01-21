import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Dropdown from 'react-dropdown'

import {
    Panel, Columns, Container,
    Section, TitleSpan
} from '../app/bulma';
import Loading from '../app/loading';

import {fetchAll, fetchCategories} from './actions';

import './products.scss';

const product = (product, index) => (
    <div className="is-3" key={index}>
        <Panel>
            <Link className="no-dec" to={"/products/" + product._id.$oid}>
                <p className="is-marginless">
                    <img className="is-128x128"
                         src={API_URL + product.images[0]} />
                </p>
                <div className="panel-block vCenterContainer">
                    <div className="vCenterContent">
                      {product.name}
                    </div>
                </div>
            </Link>
        </Panel>
    </div>
);

const productsRow = (products, index) => (
    <Columns key={index}>
        {products.map(product)}
    </Columns>
);

export const productsGrid = (products) => {
    var rows = [];
    for (var i = 0; i < products.length; i++) {
        if((i % 4) === 0){
            rows.push([]);
        }
        rows[rows.length - 1].push(products[i]);
    }
    return (
        <Container>
            {rows.map(productsRow)}
        </Container>
    );
}

export function values(data) {
    var vals = [];
    for (var key in data) {
        vals.push(data[key]);
    }
    return vals;
}


const Header = (options, value, onSelect, onSearchChange) => (
    <Container>
            <Columns>
                <div>
                    <TitleSpan className="is-3">Products</TitleSpan>
                    <TitleSpan className="is-3 has-text-muted">&nbsp;|&nbsp;</TitleSpan>
                    <TitleSpan className="is-4 has-text-muted">
                        <Dropdown options={options}
                                  value={value}
                                  onChange={onSelect} />
                                  <br className="big-space"/>
                        <input type="text" className="input"
                               placeholder={`Search ${value}.`}
                               onChange={onSearchChange} />
                    </TitleSpan>
                </div>
            </Columns>
    </Container>
);

function getProductsByCategory(initialProducts, categoryId) {
    if(categoryId === null || categoryId === 'all')
        return initialProducts;

    var products = [];
    for(var i in initialProducts) {
        var product = initialProducts[i];
        if(categoryId in product.categories)
            products.push(product);
    }
    return products;
}


function convertCategoriesToOptions(categories) {
    var options = [];
    options.push({value: 'all', label:'All'});
    for(var category in categories) {
        options.push({value: category, label:categories[category]});
    }
    return options;
}

const getWords = s => s.toLowerCase().match(/[^_\W]+/g);

function matches(product, q) {
    for (var i = 0; i < q.length; i++)
        if (!product.name.toLowerCase().includes(q[i]))
            return false;
    return true;
}

@connect((store) => {
    return {
        products: store.products.products,
        categories: store.products.categories
    }
})
export default class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
            filteredProducts: null
        }
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.options = null;
    }

    onCategorySelect(category) {
        if(category.value.toLowerCase() == 'all')
            category.value = null;

        this.setState({category: category, query:null}, this.filterProducts);
    }

    onSearchChange(e) {
        const query = e.target.value;
        this.setState({query}, this.filterProducts);
    }

    filterProducts() {
        var filteredProducts = getProductsByCategory(
            this.props.products.products.data,
            this.state.category.value
        );

        if (!!this.state.query) {
            const query = getWords(this.state.query);
            filteredProducts = filteredProducts.filter(product =>
                matches(product, query)
            )
        }
        this.setState({filteredProducts});
    }

    componentDidMount() {
        this.props.dispatch(fetchAll());
        this.props.dispatch(fetchCategories());
    }

    componentWillUpdate(nextProps) {
        if(nextProps.categories.fetched && this.options === null && nextProps.products.fetched) {
            this.options = convertCategoriesToOptions(
                nextProps.categories.categories.data
            );
            this.onCategorySelect(this.options[0]);
        }
    }

    render() {
        if(this.props.products.error) alert(this.props.products.error);
        if(this.props.categories.error) alert(this.props.categories.error);

        if(!(this.props.products.fetched && this.props.categories.fetched) || this.options === null
           || this.state.filteredProducts == null || this.state.filteredProducts == undefined)
            return (<Loading />);

        const grid = productsGrid(this.state.filteredProducts);
        const header = Header(this.options, this.state.category.label,
                              this.onCategorySelect, this.onSearchChange);

        return (
            <Section className="products-section">
                {header}
                {grid}
            </Section>
        );

    }
}
