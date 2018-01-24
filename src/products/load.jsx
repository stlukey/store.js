import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {fetchProduct, fetchCategories} from './actions';
import newMessage from '../messages/actions';

import Loading from '../app/loading';

@connect((state) => {
    return {
        categories: state.products.categories
    }
})
export class LoadCategories extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories())
    }

    render() {
        if(this.props.categories.error)
            return alert(this.props.categories.error);
        if(!this.props.categories.fetched)
            return <Loading />;

        return this.props.onLoad(
            this.props.categories.categories.data
        );
    }
}

@connect((state) => {
    return {
        product: state.products.product
    }
})
class LoadProduct extends Component {
    componentDidMount() {
        const id = this.props.productId;
        this.props.dispatch(fetchProduct(id))
    }

    render() {
        const {router, dispatch, product, onLoad} = this.props;

        if(product.error) {
            dispatch(newMessage(product.error, "danger"))
            router.push('/')
            return <Loading />;
        }

        if(!product.fetched || product.saving)
            return <Loading />;

        return onLoad(product.data.data,
                                dispatch);
    }
}
export default withRouter(LoadProduct);
