import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {logoutUser} from './actions';

import Loading from '../app/loading';


@connect((store) => {
    return {
        user: store.user
    }
})
class Logout extends Component {
    componentDidMount() {
        if(this.props.user.token !== null) {
            this.props.dispatch(logoutUser())
        }
        this.props.router.push('/');
    }
    render() {
        return (<Loading />);
    }
}

export default withRouter(Logout);
