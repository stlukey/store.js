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

const LoggedIn = (
    <NavItem to='/logout'>
        Log out
        <Icon type='sign-in' />
    </NavItem>
);

const LoggedOut = (
    <NavItem to='/login'>
        Log in
        <Icon type='sign-in' />
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
                    <NavItem to='#'>Products</NavItem>
                    <NavItem to='#'>About</NavItem>
                    <NavItem to='#'>Contact</NavItem>
                </div>
                {userLinks}
            </nav>
        )
    }
}

export default NavBar;

