import React, {Component} from 'react';
import Loader from 'halogen/PulseLoader';

export default class Loading extends Component {
    render() {
        return (
            <center>
                <Loader color="#4a4a4a" size="16px" margin="40px" />
            </center>
        );
    }
}

