import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import ReactQuill from 'react-quill';

import fetchPage, {savePage} from '../../src/pages/actions';

import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';
import CMSPage from '../../src/pages';
import Loading from '../../src/app/loading';

import 'quill/dist/quill.snow.css';

@connect((store) => {
    return {
        page: store.pages
    }
})
class EditPage extends Component {
    constructor(props) {
        super(props);

        this.pageId = this.props.params.pageId;

        this.onTextChange = this.onTextChange.bind(this);
        this.save = this.save.bind(this);
        
        this.state = {
            content: ''
        };
    }
    
    onTextChange(value) {
        this.setState({ content: value });
    }

    save() {
        this.props.dispatch(savePage(this.pageId,
                                     this.state.content));
    }

    componentDidMount() {
        this.props.dispatch(fetchPage(this.pageId))
                  .then(() => this.onTextChange(
                      this.props.page.page.data.content
                  ));
    }

    render() {
        if(this.props.page.error) alert(this.props.page.error);

        if(!this.props.page.fetched)
            return (<Loading />);

        return (
            <div>
                <Title>
                    Page: {this.pageId} &nbsp;
                    (<Link to={`/pages/${this.pageId}`}>
                        View
                    </Link>)
                </Title>
                <ReactQuill theme="snow"
                            value={this.state.content}
                            onChange={this.onTextChange}/>
                <br />
                <Button onClick={this.save}
                        className="is-primary">Save</Button>
            </div>
        );
    }
}

export default EditPage;
