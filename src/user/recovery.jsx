import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import TextFieldGroup from '../app/textFieldGroup';

import {resetUserPassword} from './actions';

import Loading from '../app/loading';

import linkStateField from '../helpers/linkStateField';


@connect()
class Recovery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'details': {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const {dispatch, router, params} = this.props;
        const {details} = this.state;

        if(details.password !== details.confirm)
            return dispatch(newMessage(
                "Passwords don't match.",
                'danger'
            ));

        const {confirm, ...main_details} = details;

        dispatch(resetUserPassword(main_details, params.emailToken, router));
    }

    render() {
        var details = linkStateField(this, 'details');

        return (<div>
            <TextFieldGroup label="Password"
                            type="password"
                            onChange={details('password')} />
            <TextFieldGroup label="Confirm Password"
                            type="password"
                            onChange={details('confirm')} />
            <br />
            <a className="button is-primary" onClick={this.handleSubmit}>
                Reset Password
            </a>
        </div>);
    }
}

export default withRouter(Recovery);
