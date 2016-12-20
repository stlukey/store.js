import {combineReducers} from 'redux';

import categories from './categories';
import latest from './latest';
import popular from './popular';
import product from './product';

export default combineReducers({
    categories,
    latest,
    popular,
    product
})

