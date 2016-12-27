import React, {Component} from 'react';
import ProductPage from '../../src/products/view';
import {Link} from 'react-router';

import {Title} from '../../src/app/bulma';

const ProductView = (props) => (
    <div>
        <Title>
            Preview
            (<Link to={`/products/${props.params.productId}/edit`}>
                edit
            </Link>)
        </Title>
        <ProductPage params={props.params} preview={true}/>
    </div>
);

export default ProductView;
