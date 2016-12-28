import React, {Component} from 'react';
import {Link} from 'react-router';
import AppEnlight from 'appenlight-client';

import {
    Container
} from '../src/app/bulma';
import {Footer} from '../src/app';
import Messages from '../src/messages';

import './admin.scss';

//<Link key={i++} to="#" className="nav-item">Dashboard</Link>,
var i = 0;
const links = [
    <Link key={i++} to="/products" className="nav-item">Products</Link>,
    <Link key={i++} to="#" className="nav-item">Pages</Link>,
    <Link key={i++} to="#" className="nav-item">Users</Link>,
    <Link key={i++} to="#" className="nav-item">Shipments</Link>,
    <Link key={i++} to="#" className="nav-item">Orders</Link>,
    <a key={i++} href="/" className="nav-item">Logout</a>,
];

const NavBar = (props) => (
    <nav className="nav has-shadow is-hidden-tablet">
        <Container>
          <div className="nav-left">
            <span className="nav-item">
              Maryam&#39;s Ingredients (admin)
            </span>
          </div>
              <span className="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
              </span>
            <div className="nav-right nav-menu">
                {links}
            </div>
        </Container>
    </nav>
);

const SideBar = (props) => (
    <aside className="column is-2 aside hero is-fullheight is-hidden-mobile">
        <div>
            <div className="menu">
                <div className="title">Admin</div>
                {links}
            </div>
        </div>
    </aside>
);

class AdminApp extends Component {
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
        <NavBar />
        <div id="app">
            <div className="columns">                
                <SideBar />
                <Container className="column is-10 admin-panel">
                    <Messages />
                    {this.props.children}
                </Container>
            </div>
        </div>
        <Footer />
    </div>
    );}
}

export default AdminApp;
