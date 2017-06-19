import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {fetchToken} from './actions';

import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand
} from '../app/bulma';
import Loading from '../app/loading';

@connect((store) => {
    return {
        token: store.token
    }
})
class _RequiresLogin extends Component {
    render() {
        if(!this.props.token.valid) {
            this.props.dispatch(newMessage(
                "You must log in to do that!",
                'danger'
            ));
            this.props.router.push('/login');
            return <span />;
        }

        return (
            <span>
                {this.props.children}
            </span>
        );
    }
}

export var RequiresLogin = withRouter(_RequiresLogin);

var LoginForm = (props) => (
    <Container>
        <Columns className="is-vcentered">
            <div className="is-4 is-offset-4">
                <form onSubmit={props.handleSubmit}>

                    <Title>Login</Title>

                    <Label>Email</Label>
                    <pCommand>
                        <Field name="email"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Password</Label>
                    <pCommand>
                        <Field name="password"
                               component="input"
                               type="password" />
                    </pCommand>

                    <ControlButton className="is-primary" type="submit">
                        Login
                    </ControlButton>
                </form>
            </div>
        </Columns>
    </Container>
);


LoginForm = reduxForm({
      form: 'login'
})(LoginForm);

@connect((store) => {
    return {
        token: store.token
    }
})
class Login extends Component {
    handleSubmit = (credentials) => {
        this.props.dispatch(fetchToken(credentials))
    }

    componentWillUpdate() {
        if(this.props.token.valid)
            this.props.router.push('/');

        if(this.props.token.error)
            alert(this.props.token.error);
    }

    render() {
        if(this.props.token.fetching)
            return (<Loading />);

        return (<LoginForm onSubmit={this.handleSubmit}/>);
    }
}

export default withRouter(Login);

