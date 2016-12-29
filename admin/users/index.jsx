import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import fetchUsers from './actions';

import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

@connect(store => {
    return {
        users: store.users
    }
})
class UsersTable extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    render() {
        if(this.props.users.error)
            alert(this.props.users.error);

        if(!this.props.users.fetched)
            return <Loading />;

        const users = this.props.users.data.map((user, index) => (
            <tr key={index}>
                <td>
                    {user.last_name}, {user.first_name}
                </td>
                <td>
                    {user._id}
                </td>
                <td>
                    {user.contact_number}
                </td>
            </tr>
        ))

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        );
    }
}

const Users = (props) => (
    <div>
        <Title>Users</Title>
        <Section>
            <UsersTable />
        </Section>
    </div>
);

export default Users;
