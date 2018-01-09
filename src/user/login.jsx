import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {loginUser, fetchUser, requestUserReset} from './actions';
import TextFieldGroup from '../app/textFieldGroup';

import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand
} from '../app/bulma';
import Loading from '../app/loading';

import linkStateField from '../helpers/linkStateField';

import goToLogin from './goToLogin';


const _RequiresLogin = ({user, dispatch, router, children}) => {
    if(user.fetching) {
        return <Loading />;
    }

    if(user.details === null) {
        goToLogin(router, dispatch);
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
        var credentials = linkStateField(this, 'credentials');
        return <div>
            <h1 className="title is-1 center">Login</h1>
            <TextFieldGroup label="Email"
                            onChange={credentials('email')} />
            <TextFieldGroup label="Password"
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
    getRedirect() {
        var url = '/';

        if(!!window.redirect) {
            url = window.redirect;
            window.redirect = null;
        }

        return url;
    }

    render() {
        const {user, router, dispatch} = this.props;
        if(user.details !== null)
            router.push(this.getRedirect());

        if(user.fetching)
            return <Loading />;

        return <LoginForm
            onSubmit={credentials => dispatch(loginUser(credentials))}
        />;
    }
}

export default LoginForm;
