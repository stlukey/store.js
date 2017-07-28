import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import './navbar.scss';

import Icon from './icon';
import Loading from './loading';


import {fetchUser} from '../user/actions';
import {getToken} from './axios';

const NavToggle = () => (
    <div className="nav-toggle">
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
            Admin{' '}
            <Icon>build</Icon>
        </a>
    ) : (
        <NavItem key={0} to='/cart'>
            Basket{' '}
            <Icon>shopping_basket</Icon>
        </NavItem>
    ),
    <NavItem key={1} to='/account'>
        My Account{' '}
        <Icon>account_circle</Icon>
    </NavItem>,
    <NavItem key={2} to='/logout'>
        Log out{' '}
        <Icon>input</Icon>
    </NavItem>
];

const LoggedOut = [
    <NavItem key={3} to='/login'>
        Log in{' '}
        <Icon>account_box</Icon>
    </NavItem>,
    <NavItem key={4} to='/signup'>
        or Sign Up
    </NavItem>
];

/* TODO: Make stateful with is-active nav items */
@connect((store) => {
    return {
        user: store.user
    }
})
class NavBar extends Component {
    componentDidMount() {
        this.props.dispatch(fetchUser());
    }

    render() {
        const {user} = this.props;

        var userLinks = user.details !== null && user.token !== null ? LoggedIn(user.details.admin) : LoggedOut;

        return (
            <nav className='nav has-shadow' id='top'>
                <div className='nav-left'>
                    <NavItem to='/'>Maryam&#39;s Ingredients</NavItem>
                </div>

                <NavToggle />

                <div className="nav-right nav-menu">
                    <NavItem to='/products'>Products</NavItem>
                    <NavItem to='/about'>About</NavItem>
                    <NavItem to='/contact'>Contact</NavItem>
                    {userLinks}
                </div>
            </nav>
        )
    }
}

export default NavBar;
