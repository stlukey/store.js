import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Title,
    Section,
    Button
} from '../../src/app/bulma';

import {fetchImages, setImages} from './actions';

import {ImageField} from '../images';

import Loading from '../../src/app/loading';

const setImage = props =>
    <ImageField {...props} src={`${API}/simages/${props.name}.jpg`} />;

@connect(store => {
    return {
        appearance: store.admin.appearance
    }
})
class AppearencePage extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {};

        window.cacheKey = 0;

    }


    componentDidMount() {
        this.props.dispatch(fetchImages());
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.appearance.data);
        if (nextProps.appearance.updated)
            window.cacheKey = window.cacheKey? window.cacheKey + 4: 0;
    }

    update() {
        this.props.dispatch(setImages(this.state));
    }



    render() {
        if (this.state == {})
            return <Loading />;

        return <div>
            <Title>Appearence</Title>
            <Section>
                    <Title>Set Images</Title>
                    {Object.keys(this.state).map((name, index) =>
                        <ImageField update={this.update}
                                    key={window.cacheKey + index}
                                    src={`${API}/../simages/${name}.jpg`}
                                    name={name}
                                    parent={this}/>
                    )}
            </Section>
        </div>;
    }
}

export default AppearencePage;
