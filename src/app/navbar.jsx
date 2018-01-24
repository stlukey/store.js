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

const LoggedOut = <NavItem key={3} to='/login'>
    <span className="nav-label">Log in{' '}</span>
    <Icon>account_box</Icon>
</NavItem>;

/* TODO: Make stateful with is-active nav items */
@connect((store) => {
    return {
        user: store.user
    }
})
class NavBar extends Component {
    render() {
        const {user} = this.props;

        var userLinks = user.details !== null && user.token !== null ? LoggedIn(user.details.admin) : LoggedOut;

        return (
            <nav className='nav has-shadow main-nav' id='top'>
                <div className='nav-center' id='main-label'>
                    <NavItem to='/' id="title">{window.SITE_TITLE} {DEMO ? "(demo)" : null}</NavItem>
                </div>
                <br />



                <div className="nav-right">
                    <NavItem to='/products'>Products</NavItem>
                    <NavItem to='/about'>About</NavItem>
                    <NavItem to='/contact'>Contact</NavItem>
                    {userLinks}
                </div>

                <div className="nav-mobile">
                    <NavItem to='/products'>Products</NavItem>
                    <NavItem to='/about'>About</NavItem>
                    <NavItem to='/contact'>Contact</NavItem>
                    <span className="pull-right">{userLinks}</span>                    
                </div>

            </nav>
        )
    }
}

export default NavBar;
