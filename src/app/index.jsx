import React, {Component} from 'react';
import {connect} from 'react-redux';

import './app.scss';
import 'font-awesome/scss/font-awesome.scss';    


import NavBar from './navbar';
import Messages from '../messages';

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
                <Footer />
            </div>
        );
    }
}

export default App;

