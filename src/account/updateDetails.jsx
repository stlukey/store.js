import React, {Component} from 'react'


import {
    Label
} from '../app/bulma';

import linkStateField from '../helpers/linkStateField';


class UpdateDetails extends Component {
    constructor(props) {
        super(props);

        var {_id, create_time, cart, active, ...details} = this.props.details;

        this.state = {
            details: details
        };
    }

    render() {
        const linkToDetails = linkStateField(this, 'details');
        window.state = this.state;

        return (
            <div>
                <Label>Email</Label>
                <span>{this.props.details._id}</span>

                <Label>Password</Label>
                <input type="password"
                       onChange={linkToDetails("password")}/>

                <Label>Confirm Password</Label>
                <input type="password" />

                <Label>First Name</Label>
                <input type="text"
                       value={this.state.details.first_name}
                       onChange={linkToDetails("first_name")}/>

                <Label>Last Name</Label>
                <input type="text"
                       value={this.state.details.last_name}
                       onChange={linkToDetails("last_name")}/>

                <Label>Contact Number</Label>
                <input type="text"
                       value={this.state.details.contact_number}
                       onChange={linkToDetails("contact_number")}/>


                <br />
                <br />
                <a className="is-primary button" onClick={() => this.props.updateDetails(this.state.details)}>
                    Update
                </a>
            </div>
        );
    }
}

export default UpdateDetails;
