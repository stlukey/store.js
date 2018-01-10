import {applyMiddleware, createStore} from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducer from './reducers';

const loadState = () => {
	try {
		const serializedState = localStorage.state;
		if(serializedState === undefined)
			return undefined;

		return JSON.parse(serializedState);
	}
	catch (err) {
		console.error(err);
		return undefined;
	}
}

const middleware = applyMiddleware(
	promise(),
	thunk,
	logger()
);

const store = createStore(reducer, middleware);
export default store;
