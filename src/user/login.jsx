import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {loginUser, fetchUser, requestUserReset} from './actions';
import TextFeildGroup from '../app/textFeildGroup';

import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand
} from '../app/bulma';
import Loading from '../app/loading';

const _RequiresLogin = ({user, dispatch, router, children}) => {
    if(user.details === null) {
        dispatch(newMessage(
            "You must log in to do that!",
            'danger'
        ));
        router.push('/login');
        return <span />;
    }

    return (
        <span>
            {children}
        </span>
    );
};

export var RequiresLogin = connect(store => ({
    user: store.user
}))(withRouter(_RequiresLogin));

const linkStateFeild = (obj, feildKey) => (key) => (e) => {
    var state = obj.state;
    state[feildKey][key] = e.target.value;
    obj.setState(state);
}

@connect()
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {}
        };
        this.onClick = this.onClick.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onClick() {
        return this.props.onSubmit(this.state.credentials);
    }

    onReset() {
        this.props.dispatch(requestUserReset(this.state.credentials.email));
    }

    render() {
        var credentials = linkStateFeild(this, 'credentials');
        return <div>
            <TextFeildGroup label="Email"
                            onChange={credentials('email')} />
            <TextFeildGroup label="Password"
                            onChange={credentials('password')}
                            type="password" />
            <br />
            <a className="button is-primary" onClick={this.onClick}>
                Login
            </a> {" "}
            <a className="button is-primary" onClick={this.onReset}>
                Reset Password
            </a>
        </div>;
    }
}


@connect((store) => ({
    user: store.user
}))
class Login extends Component {
    handleSubmit = (credentials) => {
        this.props.dispatch(loginUser(credentials));
    }

    render() {
        const {user, router} = this.props;
        if(user.details !== null)
            router.push('/');

        if(user.fetching)
            return <Loading />;

        return <LoginForm onSubmit={this.handleSubmit}/>;
    }
}

export default withRouter(Login);
