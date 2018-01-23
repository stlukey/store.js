import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';

import newMessage from '../messages/actions';
import TextFieldGroup from '../app/textFieldGroup';

import {createUser} from './actions';

import Loading from '../app/loading';

import linkStateField from '../helpers/linkStateField';
import Popup from '../helpers/Popup';


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                subscribe: true
            },
            agreed: false,
        };
        this.onClick = this.onClick.bind(this);
        this.toggleSubscribe = this.toggleSubscribe.bind(this);
    }

    onClick() {
        this.props.onSubmit(this.state.details);
    }

    toggleSubscribe() {
        var details = this.state.details;
        details.subscribe = !details.subscribe;
        this.setState({details});
    }

    render() {
        var toDetails = linkStateField(this, 'details');

        const {details, agreed} = this.state;
        const {onSubmit} = this.props;

        return <div>
            <TextFieldGroup label="Email"
                            onChange={toDetails('_id')} />
            <TextFieldGroup label="Password"
                            type="password"
                            onChange={toDetails('password')} />
            <TextFieldGroup label="Confirm Password"
                            type="password"
                            onChange={toDetails('confirm')} />
            <TextFieldGroup label="First Name"
                            onChange={toDetails('first_name')} />
            <TextFieldGroup label="Last Name"
                            onChange={toDetails('last_name')} />
            <TextFieldGroup label="Contact Number"
                            onChange={toDetails('contact_number')} />
            <br/>
            <input type="checkbox" onChange={this.toggleSubscribe}
            checked={this.state.details.subscribe} />
            <span>I would like to subscribe to the mailing list.</span>
            
            <br />

            <input type="checkbox" checked={this.state.agreed}
            onChange={() => this.setState({agreed: !this.state.agreed})} />
            <span>
                I have read and agree to the
                <Popup to="/terms-and-conditions">Terms and Conditions</Popup>
                and
                <Popup to="/privacy">Privacy Policy</Popup>.
            </span>

            <br/>
            <br/>

            <button className="button is-primary"
                     onClick={() => onSubmit(details)}
                     disabled={!agreed}>
                Sign Up
            </button>
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
