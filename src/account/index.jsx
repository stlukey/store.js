import React, {Component} from 'react'
import {connect} from 'react-redux';

// import Loading from '../app/loading';
import {Section, Title} from '../app/bulma';

/// import fetchPage from './actions';

@connect((store) => {
    return {
    }
})
export default class Account extends Component {
    componentDidMount() {
        //this.props.dispatch(fetchPage(this.props.pageId))
    }

    render() {
        return (
            <Section>
                <Title>Your Account</Title>
            </Section>
        );
        /*if(this.props.page.error) alert(this.props.page.error);

        if(!this.props.page.fetched)
            return (<Loading />);

        const page_html = {
            __html: this.props.page.page.data.content
        };

        return (
            <Section className="content" dangerouslySetInnerHTML={page_html} />
        );*/
    }
}

