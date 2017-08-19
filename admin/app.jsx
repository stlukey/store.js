import React, {Component} from 'react';
import {Link} from 'react-router';
import AppEnlight from 'appenlight-client';
import {connect} from 'react-redux';

import {
    Container
} from '../src/app/bulma';
import Loading from '../src/app/loading';
import {Footer} from '../src/app';
import Messages from '../src/messages';

import {fetchUser} from '../src/user/actions';

import './admin.scss';

//<Link key={i++} to="#" className="nav-item">Dashboard</Link>,
var i = 0;
const links = [
    <Link key={i++} to="/appearence" className="nav-item">Appearence</Link>,
    <Link key={i++} to="/images" className="nav-item">Images</Link>,
    <Link key={i++} to="/products" className="nav-item">Products</Link>,
    <Link key={i++} to="/pages" className="nav-item">Pages</Link>,
    <Link key={i++} to="/users" className="nav-item">Users</Link>,
    <Link key={i++} to="/shipments" className="nav-item">Shipments</Link>,
    <Link key={i++} to="/orders" className="nav-item">Orders</Link>,
    <a key={i++} href="/" className="nav-item">Home</a>,
];

window.showMenu = false;

const NavBar = (props) => (
    <nav className="nav has-shadow is-hidden-tablet">
        <Container>
          <div className="nav-left">
            <span className="nav-item">
              Maryam&#39;s Ingredients (admin)
            </span>
          </div>
              <span className="nav-toggle" onClick={() => {window.showMenu = !window.showMenu;}}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            <div className="nav-right">
                <span className={window.showMenu ? "" : "nav-menu"}>{links}</span>
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

@connect((store) => {
    return {
        user: store.user
    }
})
class RequiresAdmin extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    render() {
        if(!this.props.user.fetched)
            return <Loading />;

        if(!(!!this.props.user.details && this.props.user.details.admin))
            return window.location.replace('/login');

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

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
        <RequiresAdmin>
            <NavBar />
            <div id="adminApp">
                <div className="columns">
                    <SideBar />
                    <Container className="column is-10 admin-panel">
                        <Messages />
                        {this.props.children}
                    </Container>
                </div>
            </div>
        </RequiresAdmin>
    );}
}

export default AdminApp;
