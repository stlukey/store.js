import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import {createToken} from './actions';

import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand
} from '../app/bulma';
import Loading from '../app/loading';

var SignupForm = (props) => (
    <Container>
        <Columns>
            <div className="is-4 is-offset-4">
                <form onSubmit={props.handleSubmit}>

                    <Title>Signup</Title>

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

                    <Label>Confirm Password</Label>
                    <pCommand>
                        <Field name="confirm"
                               component="input"
                               type="password" />
                    </pCommand>

                    <Label>First Name</Label>
                    <pCommand>
                        <Field name="first"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Last Name</Label>
                    <pCommand>
                        <Field name="last"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Contact Number</Label>
                    <pCommand>
                        <Field name="contact"
                               component="input"
                               type="text" />
                    </pCommand>


                    <br />
                    <br />
                    <ControlButton className="is-primary" type="submit">
                        Sign Up
                    </ControlButton>
                </form>
            </div>
        </Columns>
    </Container>
);


SignupForm = reduxForm({
      form: 'signup'
})(SignupForm);

@connect((store) => {
    return {
        token: store.token
    }
})
class Signup extends Component {
    handleSubmit = (details) => {
        const {
            email, password,
            confirm, first,
            last, contact
        } = details;

        if(password !== confirm)
            return this.props.dispatch(newMessage(
                "Passwords don't match.",
                'danger'
            ));

        const data = {
            _id: email,
            password: password,
            first_name: first,
            last_name: last,
            contact_number: contact
        };

        this.props.dispatch(createToken(data))
                  .then(this.props.dispatch(newMessage(
                      "Account created.",
                      'success'
                  )));
    }

    componentWillUpdate() {
        if(this.props.token.created)
            this.props.router.push('/login');

        if(this.props.token.error)
            alert(this.props.token.error);
    }

    render() {
        if(this.props.token.fetching)
            return (<Loading />);

        return (<SignupForm onSubmit={this.handleSubmit}/>);
    }
}

export default withRouter(Signup);

