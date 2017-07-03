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

const LoggedIn = admin => (
    <span>
        {admin ? (
            <a href={`/admin/token/${getToken()}`} className="nav-item is-tab">
                Admin{' '}
                <Icon>build</Icon>
            </a>
        ) : (
            <NavItem to='/cart'>
                Basket{' '}
                <Icon>shopping_basket</Icon>
            </NavItem>
        )}
        <NavItem to='/account'>
            My Account{' '}
            <Icon>account_circle</Icon>
        </NavItem>
        <NavItem to='/logout'>
            Log out{' '}
            <Icon>input</Icon>
        </NavItem>
    </span>
);

const LoggedOut = (
    <span>
        <NavItem to='/login'>
            Log in{' '}
            <Icon>account_box</Icon>
        </NavItem>
        <NavItem to='/signup'>
            or Sign Up
        </NavItem>
    </span>
);

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
                </div>
                {userLinks}
            </nav>
        )
    }
}

export default NavBar;
