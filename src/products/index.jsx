import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Panel, Columns, Container} from '../app/bulma';
import Loading from '../app/loading';

import {fetchAll} from './actions';

const product = (product, index) => (
    <div className="is-3" key={index}>
        <Panel>
            <Link className="no-dec" to={"/products/" + product._id.$oid}>
                <p className="is-marginless">
                    <img className="is-128x128"
                         src={API_URL + product.images[0]} />
                </p>
                <div className="panel-block">
                    {product.name}
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

const productsGrid = (products) => {
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

@connect((store) => {
    return {
        products: store.products.products
    }
})
export default class ProductsPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchAll());
    }

    render() {
        if(this.props.products.error) alert(this.props.products.error);

        return this.props.products.fetched ?
            productsGrid(this.props.products.products.data) : (<Loading />);
    }
}
