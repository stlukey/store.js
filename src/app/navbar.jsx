import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import './navbar.scss';

import Icon from './icon';

import $ from 'jquery';




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

const LoggedIn = [
        <NavItem to='/cart' key={1}>
            Basket{' '}
            <Icon>shopping_basket</Icon>
        </NavItem>,
        <NavItem to='#' key={2}>
            My Account{' '}
            <Icon>account_circle</Icon>
        </NavItem>,
        <NavItem to='/logout' key={3}>
            Log out{' '}
            <Icon>input</Icon>
        </NavItem>
];

const LoggedOut = (
    <NavItem to='/login'>
        Log in{' '}
        <Icon>account_box</Icon>
    </NavItem>
);

/* TODO: Make stateful with is-active nav items */
@connect((store) => {
    return {
        token: store.token
    }
})
class NavBar extends Component {
    componentDidMount() {
        var $toggle = $('.nav-toggle');
        var $menu = $('.nav-menu');

        $toggle.click(function() {
          $(this).toggleClass('is-active');
          $menu.toggleClass('is-active');
        });
    }

    render() {
        const userLinks = this.props.token.valid ? LoggedIn : LoggedOut;
        return (
            <nav className='nav has-shadow' id='top'>
                <div className='nav-left'>
                    <NavItem to='/'>Maryams Ingredients</NavItem>
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

