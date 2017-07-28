import React, {Component} from 'react';
import {connect} from 'react-redux';

import './app.scss';
import 'font-awesome/scss/font-awesome.scss';


import NavBar from './navbar';
import Messages from '../messages';

import AppEnlight from 'appenlight-client';

export const Footer = (props) => (
    <footer>
    <center>
        <p>Copyright &copy; Maryam&#39;s Ingredients 2016</p>
        <p>Developed by Luke Southam &lt;luke@devthe.com&gt;</p>
        </center>
    </footer>
);


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
            <div>
                <this.navBar />
                <div id="app">
                    <Messages />
                    {this.props.children}
                </div>
                <br/>
                <hr/>
                <Footer />
            </div>
        );
    }
}

export default App;
