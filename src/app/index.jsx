import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from "axios";

import './app.scss';
import 'font-awesome/scss/font-awesome.scss';

import Footer from './footer'
import NavBar from './navbar';
import Messages from '../messages';

import {sendReminderEmail} from '../cart/actions';

import AppEnlight from 'appenlight-client';

import {fetchUser} from '../user/actions';


@connect((store) => ({
    user: store.user,
    cart: store.cart
}))
class App extends Component {
    constructor(props) {
        super(props);
        this.navBar = props.navBar !== undefined ?
                      props.navBar : NavBar;
    }

    componentDidMount() {
        this.props.dispatch(fetchUser());

        if(APPENLIGHT_API_KEY) {
            /*AppEnlight.init({
                apiKey: APPENLIGHT_API_KEY,
                windowOnError: 1
            });*/
        };

        console.log("Application mounted.");
    }

    render() {
        window.user = this.props.user;
        window.cart = this.props.cart;
        window.axios = axios;
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
