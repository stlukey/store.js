import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';

import {ImageField} from '../images';

import {setImage} from './actions';

import Loading from '../../src/app/loading';


@connect(store => {
    return {
        products: store.admin.products
    }
})
class ProductEditImages extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        var s = this.props.data.images[0];
        this.state = {
            main:  s.substr(8, s.length -8 - 4)
        };

        window.cacheKey = 0;

    }

    update() {
        this.props.dispatch(setImage(this.props.data._id.$oid, this.state.main));
    }



    render() {
        if (this.state == {})
            return <Loading />;

        return <div>
            <Title>Images</Title>
            <Section>
                    <ImageField update={this.update}
                                    key={window.cacheKey}
                                    src={`${API_URL}/..${this.props.data.images[0]}`}
                                    name={'main'}
                                    parent={this}/>
            </Section>
        </div>;
    }
}

export default ProductEditImages;
