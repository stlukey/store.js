import {combineReducers} from 'redux';

import images from './images';
import products from './products';
import orders from './orders';
import shipments from './shipments';
import shipment from './shipment';
import messages from '../../src/reducers/messages';

import { reducer as form } from 'redux-form';

export default combineReducers({
    products,
    messages,
    orders,
    shipments,
    shipment,
    images
})
