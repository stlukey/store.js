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


    notFound() {
        let {router, dispatch} = this.props;
        router.push('/');

        dispatch(newMessage("That product can not be found.", "danger"));
        return <Loading />;
    }

    render() {
        if(this.props.product.error)
            return this.notFound();

        if(!this.props.product.fetched || this.props.product.saving)
            return <Loading />;

        return this.props.onLoad(this.props.product.data.data,
                                 this.props.dispatch);
    }
}
export default withRouter(LoadProduct);
