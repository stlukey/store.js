import React, {Component} from 'react';

import {RequiresLogin} from '../user/login';

import Cart from './cart';
import './cart.scss';


class CartPage extends Component {
    render() {
        return (
            <RequiresLogin>
                <Cart />
            </RequiresLogin>
        );
    }
}

export default CartPage;
