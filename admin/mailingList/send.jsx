import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';
import {sendMail} from './actions';

import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';
import Loading from '../../src/app/loading';

import newMessage from '../../src/messages/actions';


import 'quill/dist/quill.snow.css';

import linkState from '../../src/helpers/linkState';

@connect()
class SendMail extends Component {
    constructor(props) {
        super(props);

        this.onTextChange = this.onTextChange.bind(this);
        this.send = this.send.bind(this);

        this.state = {
            subject: '',
            content: ''
        };
    }

    send() {
        const {subject, content} = this.state;
        const {dispatch, router} = this.props;

        if(!subject){
            dispatch(newMessage("Error: subject required."), 'danger');
            return;
        }

        if(!content) {
            dispatch(newMessage("Error: content required."), 'danger');
            return;

        }
        dispatch(sendMail(subject, content, router));
    }

    onTextChange(value) {
        this.setState({ content: value });
    }

    render() {

        return (
            <div>
                <Title>
                    Sending Email to Mailing List
                </Title>
                <span>Subject: </span><input type="text" onChange={linkState(this, 'subject')} />
                <br />
                <br />
                <ReactQuill theme="snow"
                            value={this.state.content}
                            onChange={this.onTextChange}/>
                <br />
                <Button onClick={this.send}
                        className="is-primary">Send</Button>
            </div>
        );
    }
}


export default withRouter(SendMail);
