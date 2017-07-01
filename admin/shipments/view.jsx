import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';


import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

import {fetchShipment, dispatchShipment} from './actions';
import {fetchAll} from '../products/actions';
import {OrderView} from '../../src/orders';

const Detail = (props) => (
    <div className="column card">
        <header className="card-header">
            <p className="card-header-title">
                {props.title}
            </p>
        </header>
        <div className="card-content">
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
)

@connect((store) => {
    return {
        shipment: store.admin.shipment,
        products: store.products.products
    }
})
class ShipmentsView extends Component {
    constructor(props) {
        super(props);
        this.markAsDispatched = this.markAsDispatched.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchShipment(this.props.params.shipmentId));
        this.props.dispatch(fetchAll());
    }

    markAsDispatched() {
        this.props.dispatch(dispatchShipment()).then(() =>
            this.props.router.push('/shipments')
        ).catch((msg) => alert(msg));
    }

    render() {
        if(this.props.shipment.error)
            return alert(this.props.shipment.error);
        if(this.props.products.error)
            return alert(this.props.products.error);

        if(!this.props.shipment.fetched || !this.props.products.fetched)
            return <Loading />;

        return (
            <Section>
                <Title>Shipment #{this.props.shipment.data._id.$oid}</Title>
                <div className="columns">
                    <Detail title="Created">
                        {new Date(this.props.shipment.data.datetime.$date).toString()}
                    </Detail>
                    <Detail title="Dispatched">
                        {this.props.shipment.data.dispatch_datetime ?
                            <span>{new Date(this.props.shipment.data.dispatch_datetime.$date).toString()}</span> :
                            <a className="button is-primary" onClick={this.markAsDispatched}>Mark as Dispatched</a>
                        }
                    </Detail>
                </div>
                <ol>
                    {this.props.shipment.data.orders.map((order, index) =>
                        <li key={index}><OrderView summary={true} orderData={order} productsData={this.props.products.products.data} /></li>)}
                </ol>
            </Section>
        );
    }
}


export default withRouter(ShipmentsView);
