import React, {Component} from 'react';
import FileInput from 'react-file-input';

import {
    Title,
    Button
} from '../../src/app/bulma';


const imageNameToIndex = {
    'main': 0,
    'home': 1
};

class ProductEditImages extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.state = {};
    }

    handleChange = (target) => (event) => {
        var state = this.state;
        state[target] = event.target.files[0];
        this.setState(state);
    }

    save = (target) => (event) => {
        const productId = this.props.data._id.$oid;

        const file = this.state[target];
        if(file === undefined)
            return this.props.dispatch(
                newMessage("No image provided!", 'warning')
            );

        this.props.dispatch(
            uploadImage(productId, file, imageNameToIndex[target])
        );
    }

    render() {

        const homeImage = this.props.data.images.length ? (
            <div className="input-row">
                <label htmlFor="home-image">
                    Home Image:&nbsp;&nbsp;
                </label>
                <input className="image-input"
                       name="home-image"
                       type="file"
                       onChange={this.handleChange('home')}
                       accept=".jpg"/>
                <Button className="is-primary"
                        onClick={this.save('home')}>
                Save
                </Button>
            </div>
        ) : (
            <div className="input-row">
                <label htmlFor="home-image">
                    Home Image:&nbsp;&nbsp;
                </label>
                <span>You must upload a main image first.</span>
            </div>
        );

        return (
            <div>

            <Title>Images</Title>
            <div className="input-row">
                <label htmlFor="main-image">
                    Main Image:&nbsp;&nbsp;
                </label>
                <input className="image-input"
                       name="main-image"
                       type="file"
                       onChange={this.handleChange('main')}
                       accept=".jpg"/>
                <Button className="is-primary"
                        onClick={this.save('main')}>
                Save
                </Button>
            </div>
            {homeImage}
            </div>
        );
    }
}

export default ProductEditImages;
