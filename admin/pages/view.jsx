import React, {Component} from 'react';
import {Link} from 'react-router';

import {
    Title,
    Section
} from '../../src/app/bulma';
import CMSPage from '../../src/pages';

class ViewPage extends Component {
    render() {
        const pageId = this.props.params.pageId;
        return (
            <div>
                <Title>
                    Page: {pageId} &nbsp;
                    (<Link to={`/pages/${pageId}/edit`}>
                        Edit
                    </Link>)
                </Title>
                <CMSPage pageId={pageId} />
            </div>
        );
    }
}

export default ViewPage;
