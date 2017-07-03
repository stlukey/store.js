import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';
import {activateUser} from './actions';

@connect(store => ({
    user: store.user
}))
class ConfirmEmail extends Component {
    componentDidMount() {
        const {dispatch, router, params} = this.props;
        dispatch(activateUser(params.emailToken, router));
    }

    render() {
        return <Loading />;
    }
}

export default withRouter(ConfirmEmail);
