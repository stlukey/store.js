import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Field, reduxForm} from 'redux-form';

import newMessage from '../messages/actions';
import TextFieldGroup from '../app/textFieldGroup';

import {createUser} from './actions';

import Loading from '../app/loading';

import linkStateField from '../helpers/linkStateField';


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onSubmit(this.state.details);
    }

    render() {
        var details = linkStateField(this, 'details');
        return <div>
            <TextFieldGroup label="Email"
                            onChange={details('_id')} />
            <TextFieldGroup label="Password"
                            type="password"
                            onChange={details('password')} />
            <TextFieldGroup label="Confirm Password"
                            type="password"
                            onChange={details('confirm')} />
            <TextFieldGroup label="First Name"
                            onChange={details('first_name')} />
            <TextFieldGroup label="Last Name"
                            onChange={details('last_name')} />
            <TextFieldGroup label="Contact Number"
                            onChange={details('contact_number')} />
            <br />
            <a className="button is-primary" onClick={this.onClick}>
                Sign Up
            </a>
        </div>;
    }
}


@connect((store) => {
    return {
        user: store.user
    }
})
class Signup extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(details) {
        const {dispatch, router} = this.props;

        if(details.password !== details.confirm)
            return dispatch(newMessage(
                "Passwords don't match.",
                'danger'
            ));

        const {confirm, ...main_details} = details;

        dispatch(createUser(main_details, router));
    }

    render() {
        if(this.props.user.fetching)
            return (<Loading />);

        return (<SignupForm onSubmit={this.handleSubmit}/>);
    }
}

export default withRouter(Signup);
