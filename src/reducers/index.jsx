import {combineReducers} from 'redux';

import products from './products';
import messages from './messages';

export default combineReducers({
    products,
    messages
})

