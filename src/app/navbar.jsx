import React, {Component} from 'react';
import {Link} from 'react-router';

import './navbar.scss';

import Icon from './icon';

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



/* TODO: Make stateful with is-active nav items */
const NavBar = () => (
    <nav className='nav has-shadow' id='top'>
        <div className='nav-left'>
            <NavItem to='/'>Maryams Ingredients</NavItem>
        </div>

        <NavToggle />

        <div className="nav-right nav-menu">
            <NavItem to='#'>Products</NavItem>
            <NavItem to='#'>About</NavItem>
            <NavItem to='#'>Contact</NavItem>
            <NavItem to='/login'>
                Login
                <Icon type='sign-in' />
            </NavItem>
        </div>
    </nav>
)

export default NavBar;

