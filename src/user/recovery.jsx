import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

import newMessage from '../messages/actions';
import TextFeildGroup from '../app/textFeildGroup';

import {resetUserPassword} from './actions';

import Loading from '../app/loading';

const linkStateFeild = (obj, feildKey) => (key) => (e) => {
    var state = obj.state;
    state[feildKey][key] = e.target.value;
    obj.setState(state);
}


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
        var details = linkStateFeild(this, 'details');

        return (<div>
            <TextFeildGroup label="Password"
                            type="password"
                            onChange={details('password')} />
            <TextFeildGroup label="Confirm Password"
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
