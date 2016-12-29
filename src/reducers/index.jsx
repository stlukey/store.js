import {combineReducers} from 'redux';

import products from './products';
import messages from './messages';
import token from './token';
import pages from './pages';
import cart from './cart';
import users from './users';

import { reducer as form } from 'redux-form';

export default combineReducers({
    products,
    messages,
    form,
    token,
    pages,
    cart,
    users
})

