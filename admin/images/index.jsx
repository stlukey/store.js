import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classnames from 'classnames';
import Clipboard from 'clipboard';
import newMessage from '../../src/messages/actions';
import Messages from '../../src/messages';
import './index.scss';


import {fetchImages, uploadImage, deleteImage} from './actions';

import Loading from '../../src/app/loading';
import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';

import linkState from '../../src/helpers/linkState';


window.popUpChecker = null;

const openPopup = (name, selectImage) => () => {
    localStorage.selectedImage = null;
    localStorage.selectedImageName = name;
    window.open('/admin/images/popup','popup','width=800,height=600');
    window.popUpChecker = setInterval(function(){
      if(localStorage.selectedImage != "null"){
          selectImage(localStorage.selectedImageName)(localStorage.selectedImage);
        clearInterval(popUpChecker);
      }
  }, 1000);
}

const closePopup = (id) => {
    localStorage.selectedImage = id;
    window.close();
}

export class ImageField extends Component {
    constructor(props) {
        super(props);
        this.parent = this.props.parent;
        this.selectImage = this.selectImage.bind(this);
    }

    selectImage(name) {
        return (id) => {
            var s = this.parent.state;
            s[name] = id;
            this.parent.setState(s);
        }
    }

    render() {

        var {name, parent, src, update, paste} = this.props;

        return (
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label htmlFor={name} className="label">
                        {name}:&nbsp;&nbsp;
                    </label>
                </div>

                <div className="field-body">
                    <div className="field has-addons has-addons-right set-image-row">
                        <p className="control"><img src={src+ '?' + Math.random()} /></p>
                        <p className="control">
                            <input name={name} type="text"
                                   value={parent.state[name]} onChange={linkState(parent, name)} />
                        </p>
                        <p className="control">
                            <Button
                              onClick={openPopup(name, this.selectImage)}>
                               Select
                            </Button>
                            <Button className="is-primary"
                              onClick={update}>
                               Update
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

@connect(store => {
    return {
        images: store.admin.images
    }
})
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
        this.props.dispatch(uploadImage(this.state.image));
    }

    handleChange = (target) => (event) => {
        var state = this.state;
        state[target] = event.target.files[0];
        this.setState(state);
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.images.upload) {
            this.activate(false);
        }
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
                {this.props.images.upload != false ? <div className="input-row">
                    <label htmlFor="name">
                        Image:&nbsp;&nbsp;
                    </label>
                    <input className="image-input"
                           name="image"
                           type="file"
                           onChange={this.handleChange('image')}
                           accept=".jpg"/>
                </div> : <Loading />}
            </section>
            <footer className="modal-card-foot">
              <a className="button is-primary"
                 onClick={this.upload}>Upload</a>
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

const ImageCard = ({image, onSelect, popup, del})  =>
    <div className="card">
        <div className="card-content">
            <img src={`${API_URL}${image.url}`} />
        </div>
        <footer className="card-footer">
            <p className="card-footer-item">
                <button className="button is-primary clip"
                   data-clipboard-text={API_URL + image.url}
                   onClick={onSelect}>
                    {popup ? 'Select' : 'Copy URL'}
                </button>
            </p>
            <p className="card-footer-item">
                <a href="#" className="button" onClick={del}>
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
    constructor(props) {
        super(props);
        this.del = this.del.bind(this);

        if (!this.props.popup) {
            this.c = new Clipboard('.clip');
            this.c.on('success', () =>
                this.props.dispatch(newMessage('Image URL copied.', 'success')));
        }
    }

    componentDidMount() {
        this.onSelect = this.onSelect.bind(this);
        this.props.dispatch(fetchImages());
    }

    onSelect(id) {
        return () => {
            if (!!this.props.popup) {
                closePopup(id);
            }
        };
    }

    del(id) {
        return () => {
            if (confirm("Are you sure?"))
                this.props.dispatch(deleteImage(id))
            };
    }

    render() {
        if(!this.props.images)
            return <Loading />;

        const images = this.props.images.map((image, index) => (
            <div className="column" key={index}>
                 <ImageCard image={image}
                            onSelect={this.onSelect(image._id.$oid)}
                            popup={!!this.props.popup}
                            del={this.del(image._id.$oid)}/>
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

export const ImagesPopup = () =>(
    <div id="popup">
        <Messages />
        <br />
        <ImagesGrid popup={true}/>
    </div>
);

const Images = (props) => (
    <div>
        <Title>Images</Title>
        <Section>
            <ImagesGrid />
        </Section>
    </div>
);

export default Images;
