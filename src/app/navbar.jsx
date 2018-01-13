import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import './navbar.scss';

import Icon from './icon';
import Loading from './loading';


import {getToken} from './axios';

const NavToggle = (props) => (
    <div className="nav-toggle" {...props}>
        <span/><span/><span/>
    </div>
)

const NavItem = (props) => (
    <Link to={props.to} className="nav-item is-tab">
        {props.children}
    </Link>
)

const LoggedIn = admin => [
    admin ? (
        <a href={`/admin/token/${getToken()}`} className="nav-item is-tab">
            <span className="nav-label">Admin{' '}</span>
            <Icon>build</Icon>
        </a>
    ) : (
        <NavItem key={0} to='/cart'>
            <span className="nav-label">Basket{' '}</span>
            <Icon>shopping_basket</Icon>
        </NavItem>
    ),
    <NavItem key={1} to='/account'>
        <span className="nav-label">My Account{' '}</span>
        <Icon>account_circle</Icon>
    </NavItem>,
    <NavItem key={2} to='/logout'>
        <span className="nav-label">Log out{' '}</span>
        <Icon>input</Icon>
    </NavItem>
];

const LoggedOut = [
    <NavItem key={3} to='/login'>
        <span className="nav-label">Log in{' '}</span>
        <Icon>account_box</Icon>
    </NavItem>,
    <NavItem key={4} to='/signup'>
        <span className="nav-label">or Sign Up</span>
    </NavItem>
];

/* TODO: Make stateful with is-active nav items */
@connect((store) => {
    return {
        user: store.user
    }
})
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    render() {
        const {user} = this.props;

        var userLinks = user.details !== null && user.token !== null ? LoggedIn(user.details.admin) : LoggedOut;

        var apple = false; ///iPad|iPhone|iPo/.test(navigator.userAgent) && !window.MSStream;

        return (
            <nav className='nav has-shadow main-nav' id='top'>
                <NavToggle onClick={() => this.setState({showMenu:!this.state.showMenu})}/>

                <div className='nav-center' id='main-label'>
                    <NavItem to='/'>{window.SITE_TITLE}</NavItem>
                </div>



                <div className="nav-right">
                    <NavItem to='/products'>Products</NavItem>
                    <NavItem to='/about'>About</NavItem>
                    <NavItem to='/contact'>Contact</NavItem>
                    {userLinks}
                </div>

                <div className="nav-right-mobile">
                    {this.state.showMenu ? (
                        <span>
                        <NavItem to='/products'>Products</NavItem>
                        <NavItem to='/about'>About</NavItem>
                        {apple ? <span /> : <br />}
                        <NavItem to='/contact'>Contact</NavItem>
                        <NavItem to='/signup'>Sign Up</NavItem>
                    </span>
                    ) : userLinks}
                </div>
            </nav>
        )
    }
}

export default NavBar;
