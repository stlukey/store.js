import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';


import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

import {fetchOrders} from '../orders/actions';
import {fetchShipments, createShipment} from './actions';


const PreviousShipmentsTable = props => (
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Date&amp;Time Created</th>
                <th>Date&amp;Time Dispatched</th>
            </tr>
        </thead>
        <tbody>
            {props.shipments.map((shipment, index) => (
                <tr key={index}>
                    <td>
                        <Link to={"/shipments/" + shipment._id.$oid}>
                            {shipment._id.$oid}
                        </Link>
                    </td>
                    <td>
                        {new Date(shipment.datetime.$date).toString()}
                    </td>
                    <td>
                        {new Date(shipment.dispatch_datetime.$date).toString()}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

@connect((store) => {
    return {
        shipments: store.admin.shipments,
        orders: store.admin.orders
    }
})
class Shipments extends Component {
    constructor(props) {
        super(props);
        
        this.createShipment = this.createShipment.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchShipments());
        this.props.dispatch(fetchOrders());
    }

    createShipment() {
        this.props.dispatch(createShipment()).then(() =>
            this.props.dispatch(fetchShipments()).then(() =>
                this.props.router.push("/shipments/" + this.props.shipments.current._id.$oid)
            )
        ).catch(msg => alert(msg));
    }

    render() {
        window.shippments = this;
        if(this.props.shipments.error)
            return alert(this.props.shipments.error);
        if(this.props.orders.error)
            return alert(this.props.orders.error);

        if(!this.props.shipments.fetched || !this.props.orders.fetched)
            return <Loading />;

        const isPendingDispatch = !!this.props.shipments.current;
        const ordersNotShipped = this.props.orders.notShipped.length;

        return (
            <div>
                {isPendingDispatch ? (
                    <span>
                        <b>Shipment pending dispatch:{" "}</b>
                        <Link className="button is-primary" to={"/shipments/" + this.props.shipments.current._id.$oid}>
                            View Shipment
                        </Link>
                    </span>
                ) : (
                    <span>
                        <b>Orders awating shipment:{" "}</b>
                        {ordersNotShipped}
                        {ordersNotShipped > 0 ?
                            <a className="button is-primary pull-right" onClick={this.createShipment}>
                            Create Shipment
                            </a>
                        : <span />}
                    </span>
                ) }
                <br />
                <br />
                <Section>
                    <Title>Previous Shipments</Title>
                    {this.props.shipments.data.length == 0 ?
                        <span>No shipments.</span> : 
                        <PreviousShipmentsTable shipments={this.props.shipments.data} />
                    }
                </Section>
            </div>
        );
    }
}


export default withRouter(Shipments);
