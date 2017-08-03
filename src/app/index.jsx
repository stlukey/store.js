import React, {Component} from 'react';
import {connect} from 'react-redux';

import './app.scss';
import 'font-awesome/scss/font-awesome.scss';

import Footer from './footer'
import NavBar from './navbar';
import Messages from '../messages';

import AppEnlight from 'appenlight-client';



class App extends Component {
    constructor(props) {
        super(props);
        this.navBar = props.navBar !== undefined ?
                      props.navBar : NavBar;
    }

    componentDidMount() {
        if(APPENLIGHT_API_KEY) {
            AppEnlight.init({
                apiKey: APPENLIGHT_API_KEY,
                windowOnError: 1
            });
        }
        console.log("Application mounted.");
    }

    render() {
        return (
            <div id="main">
                <this.navBar />
                <div id="app">
                    <Messages />
                    {this.props.children}
                </div>
                <br/>
                <Footer />
            </div>
        );
    }
}

export default App;
