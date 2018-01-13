import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchMailingList, removeSubscriber} from './actions';

import Loading from '../../src/app/loading';
import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';

@connect(store => {
    return {
        mailingList: store.admin.mailingList
    }
})
class MailingListTable extends Component {
    componentDidMount() {
        this.props.dispatch(fetchMailingList());
    }

    render() {
        if(this.props.mailingList.error)
            return alert(this.props.mailingList.error);

        if(!this.props.mailingList.fetched)
            return <Loading />;

        const remove = (dispatch, email) => () => dispatch(removeSubscriber(email));

        const subscribers = this.props.mailingList.data.map((subscriber, index) => (
            <tr key={index}>
                <td>
                    {new Date(subscriber.datetime.$date).toString()}
                </td>
                <td>
                    {subscriber.email}
                </td>
                <td><Button onClick={remove(this.props.dispatch, subscriber.email)}>Remove</Button></td>
            </tr>
        ))

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Email</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {subscribers}
                </tbody>
            </table>
        );
    }
}

const MailingList = (props) => (
    <div>
        <Title>Mailing List <Link className="button is-primary pull-right" to="/mailing-list/send">
        Send Mail
        </Link></Title>
        <Section>
            <MailingListTable />
        </Section>
    </div>
);

export default MailingList;
