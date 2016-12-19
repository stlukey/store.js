import React from 'react';
import RouteComponent from '../app/route-component';
import {
    Container, Columns,
    Title, Label, Input,
    ControlButton
} from '../app/bulma';

const LoginForm = (props) => (
    <Container>
        <Columns className="is-vcentered">
            <div className="is-4 is-offset-4">
                <Title>Login</Title>

                <Label>Email</Label>
                <Input type="text" />

                <Label>Password</Label>
                <Input type="password" />

                <ControlButton className="is-primary">
                    Login
                </ControlButton>
            </div>
        </Columns>
    </Container>
);


class Login extends RouteComponent {
    render() {
        return (
            <LoginForm />
        );
    }
}

export default Login;

