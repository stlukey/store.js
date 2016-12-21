import React, {Component} from 'react'
import {connect} from 'react-redux';

import Loading from '../app/loading';
import {Container} from '../app/bulma';

import fetchPage from './actions';

@connect((store) => {
    return {
        page: store.pages
    }
})
export default class CMSPage extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPage(this.props.route.path))
    }

    render() {
        if(this.props.page.error) alert(this.props.page.error);

        if(!this.props.page.fetched)
            return (<Loading />);

        const page_html = this.props.page.page.data.content;

        return (
            <Container>
                {page_html}
            </Container>
        );
    }
}
