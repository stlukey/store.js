import React, {Component} from 'react';
import {connect} from 'react-redux';

import './app.scss';
import 'font-awesome/scss/font-awesome.scss';    


import NavBar from './navbar';
import Messages from '../messages';

import addMessage from '../messages/actions';

const Footer = (props) => (
    <footer>
        <p>Copyright &copy; Maryams Ingredient's 2016</p>
        <p>Developed by Luke Southam &lt;luke@devthe.com&gt;</p>
    </footer>
);


@connect()
class App extends Component {
    componentDidMount() {
        console.log("Application mounted.");
    }

    render() {
        return (
            <div>
                <NavBar />
                <div id="app">
                    <Messages />
                        { this.props.children }
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;

