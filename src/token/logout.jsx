import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {removeToken} from './actions';

import Loading from '../app/loading';


@connect((store) => {
    return {
        token: store.token
    }
})
class Logout extends Component {
    componentDidMount() {
        if(this.props.token.valid) {
            this.props.dispatch(removeToken)
        }
        this.props.router.push('/');
    }
    render() {
        return (<Loading />);
    }
}

export default withRouter(Logout);

