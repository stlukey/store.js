import {combineReducers} from 'redux';

import products from './products';
import messages from '../../src/reducers/messages';

import { reducer as form } from 'redux-form';

export default combineReducers({
    products,
    messages,
})

