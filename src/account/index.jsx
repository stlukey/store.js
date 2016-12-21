import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

// import Loading from '../app/loading';

import {
    Container, Columns,
    Title, Label, Input,
    ControlButton, pCommand,
    Section
} from '../app/bulma';

/// import fetchPage from './actions';

var SaveForm = (props) => (
    <Container>
        <Columns>
            <div>
                <form onSubmit={props.handleSubmit}>

                    <Label>Email</Label>
                    <pCommand>
                        <Field name="email"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Password</Label>
                    <pCommand>
                        <Field name="password"
                               component="input"
                               type="password" />
                    </pCommand>

                    <Label>Confirm Password</Label>
                    <pCommand>
                        <Field name="confirm"
                               component="input"
                               type="password" />
                    </pCommand>

                    <Label>First Name</Label>
                    <pCommand>
                        <Field name="first"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Last Name</Label>
                    <pCommand>
                        <Field name="last"
                               component="input"
                               type="text" />
                    </pCommand>

                    <Label>Contact Number</Label>
                    <pCommand>
                        <Field name="contact"
                               component="input"
                               type="text" />
                    </pCommand>


                    <br />
                    <br />
                    <ControlButton className="is-primary" type="submit">
                        Save
                    </ControlButton>
                </form>
            </div>
        </Columns>
    </Container>
);

SaveForm = reduxForm({
      form: 'save'
})(SaveForm);

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
                <div className="container">
                  <div className="tabs">
                    <ul>
                      <li className="is-active"><a>Details</a></li>
                      <li><a>Orders</a></li>
                    </ul>
                  </div>
                  <div className="box">
                    <p className="menu-label">Your Details</p>
                    <SaveForm />
                  </div>
                </div>
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

