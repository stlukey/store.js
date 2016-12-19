import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import Slick from 'slick-carousel/slick/slick.scss';
import SlickTheme  from 'slick-carousel/slick/slick-theme.scss';

import {
    Panel, Container, Columns, Title
} from '../app/bulma';

import Loading from '../app/loading';
import {fetchLatest, fetchPopular} from '../products/actions';

import './home.scss';


const latestProductsSettings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    centerMode: true,
    adaptiveHeight: true,
    arrows: false,
    autoplaySpeed: 5000,
    className: 'latestProducts columns'
};

const latestProduct = (product, index) => (
    <div className="latestProduct" key={index}>
        <a className="no-dec" href="#">
            <Columns>
                <div className="image">
                    <img className="is-half"
                         src={STORE_API + product.images[0]} />
                </div>
                <div className="content">
                    <Title>{product.name}</Title>
                    <p>{product.description}</p>
                </div>
            </Columns>
        </a>
    </div>
);

const latestProducts = (products) => (
    <Slider {...latestProductsSettings}>
        {products.map(latestProduct)}
    </Slider>
);



const popularProduct = (product, index) => (
    <div className="is-3" key={index}>
        <Panel>
            <a className="no-dec" href="#">
                <p className="is-marginless">
                    <img className="is-128x128"
                         src={STORE_API + product.images[0]} />
                </p>
                <div className="panel-block">
                    {product.name}
                </div>
            </a>
        </Panel>
    </div>
);

const popularProducts = (products) => (
    <Container className="popularProducts">
        <Columns>
            {products.map(popularProduct)}
        </Columns>
    </Container>
);


@connect((store) => {
    return {
        latest: store.products.latest.products,
        latestFetched: store.products.latest.fetched,
        latestFetching: store.products.latest.fetching,
        latestError: store.products.latest.error,

        popular: store.products.popular.products,
        popularFetched: store.products.popular.fetched,
        popularFetching: store.products.popular.fetching,
        popularError: store.products.popular.error
    }
})
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(fetchLatest())
        this.props.dispatch(fetchPopular())
    }

    render() {
        if(this.props.latestError) return alert(this.props.latest);
        if(this.props.popularError) return alert(this.props.popular);

        var latest = !this.props.latestFetched
            ? (<Loading/>) : latestProducts(this.props.latest.data);

        var popular = !this.props.popularFetched
            ? (<Loading/>) : popularProducts(this.props.popular.data);

        return (
            <div>
                {latest}
                <Title>Popular Products</Title>
                <hr/>
                {popular}
            </div>
        );
    }
}

