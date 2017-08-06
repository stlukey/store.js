import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classnames from 'classnames';
import Clipboard from 'clipboard';
import './index.scss';


import {fetchImages} from './actions';

import Loading from '../../src/app/loading';
import {
    Title,
    Section
} from '../../src/app/bulma';

class NewImage extends Component {
    constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
        };

        this.i = 0;
    }

    activate = (value=true) => () => {
        var state = this.state;
        state.active = value;
        this.setState(state);
    }

    upload() {
        // this.props.dispatch(createProduct(data))
        //           .then(this.goToImageUpload);
    }

    handleChange = (target) => (event) => {
        var state = this.state;
        state[target] = event.target.files[0];
        this.setState(state);
    }

    renderModal() {
        var classes = classnames('modal', {'is-active': this.state.active});
        return (<div className={classes}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Upload Image</p>
            </header>
            <section className="modal-card-body">
                <div className="input-row">
                    <label htmlFor="name">
                        Image:&nbsp;&nbsp;
                    </label>
                    <input className="image-input"
                           name="image"
                           type="file"
                           onChange={this.handleChange('image')}
                           accept=".jpg"/>
                </div>
            </section>
            <footer className="modal-card-foot">
              <a className="button is-primary"
                 onClick={this.create}>Upload</a>
              <a className="button"
                 onClick={this.activate(false)}>Cancel</a>
            </footer>
          </div>
        </div>);
    }

    render() {
        return <span>
            <a href="#" onClick={this.activate()}
                        className="button is-primary">Upload Image</a>
            {this.renderModal()}
        </span>;
    }
}

const ImageCard = props =>
    <div className="card">
        <div className="card-content">
            <img src={`${API_URL}${props.url}`} />
        </div>
        <footer className="card-footer">
            <p className="card-footer-item">
                <a href="#" className="button is-primary clip"
                   data-clipboard-text={props.url}>
                    Copy URL
                </a>
            </p>
            <p className="card-footer-item">
                <a href="#" className="button">
                    Delete
                </a>
            </p>
        </footer>
    </div>
;

@connect(store => {
    return {
        images: store.admin.images.data
    }
})
class ImagesGrid extends Component {
    componentDidMount() {
        new Clipboard('.clip');
        this.props.dispatch(fetchImages());
    }

    render() {
        if(!this.props.images)
            return <Loading />;

        window.images = this.props.images;
        const images = this.props.images.map((image, index) => (
            <div className="column" key={index}>
                 <ImageCard url={image.url} />
            </div>
        ))

        return (
            <div>
                <NewImage />
                <br />
                <br />
                <div className="columns is-multiline">
                    {images}
                </div>
            </div>
        );
    }
}

const Images = (props) => (
    <div>
        <Title>Images</Title>
        <Section>
            <ImagesGrid />
        </Section>
    </div>
);

export default Images;
