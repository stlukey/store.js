import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';
import {unsubscribe} from './actions';

@connect()
class Unsubscribe extends Component {
    componentDidMount() {
        const {dispatch, router, params} = this.props;
        dispatch(unsubscribe(params.email, router));
    }

    render() {
        return <Loading />;
    }
}

export default withRouter(Unsubscribe);
