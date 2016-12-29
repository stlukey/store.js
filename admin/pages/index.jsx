import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {fetchPages} from '../../src/pages/actions';

import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

@connect(store => {
    return {
        pages: store.pages
    }
})
class PagesTable extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPages());
    }

    render() {
        if(this.props.pages.error)
            return alert(this.props.pages.error);

        if(!this.props.pages.fetchedPages)
            return <Loading />;

        const pages = this.props.pages.pages.data.map((page, index) => (
            <tr key={index}>
                <td>
                    {page._id}
                </td>
                <td>
                    <Link to={`/pages/${page._id}`}>
                        View
                    </Link>
                </td>
                <td>
                    <Link to={`/pages/${page._id}/edit`}>
                        Edit
                    </Link>
                </td>
            </tr>
        ))

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pages}
                </tbody>
            </table>
        );
    }
}

const Pages = (props) => (
    <div>
        <Title>Pages</Title>
        <Section>
            <PagesTable />
        </Section>
    </div>
);

export default Pages;
