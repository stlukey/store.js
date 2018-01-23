import React, {Component} from 'react'
import {connect} from 'react-redux';

import Loading from '../app/loading';
import {Section, Container} from '../app/bulma';

import fetchPage from './actions';

@connect((store) => {
    return {
        page: store.pages
    }
})
export default class CMSPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPage(this.props.pageId))
    }

    render() {
        if(this.props.page.error) alert(this.props.page.error);

        if(!this.props.page.fetched)
            return (<Loading />);

        const page_html = {
            __html: this.props.page.page.data.content
        };

        return (
            <Section className="content" dangerouslySetInnerHTML={page_html} />
        );
    }
}

export const CMSRoute = () => ({location}) => <CMSPage key={location.pathname} pageId={location.pathname} />;
