import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Loading from '../app/loading';
import newMessage from '../messages/actions';
import {activateUser} from './actions';

@connect(store => {
    return {
        activate: store.activateUser
    }
})
class ConfirmEmail extends Component {
    componentDidMount() {
        this.props.dispatch(activateUser(this.props.params.emailToken));
    }

    messageAndRedirect() {
        const {error} = this.props.activate;
        if(error) this.props.dispatch(
            newMessage("Invalid activation link! Please try again.",
                       "danger")
        )
        else this.props.dispatch(
            newMessage("User account activated! Please login.",
                       "info")
        );

        this.props.router.push('/login');
    }

    render() {
        const {fetching} = this.props.activate;

        if(fetching !== null && !fetching)
            this.messageAndRedirect();

        return <Loading />;
    }
}

export default withRouter(ConfirmEmail);
