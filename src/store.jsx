//import localStorage from 'local-storage';
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

const store = createStore(reducer, middleware, /*loadState()*/);

/*store.subscribe(() => {
	try {
		const serializedState = JSON.stringify(store.getState());
		localStorage.state = serializedState;
		console.log("saving state");
	} catch (err) {
		console.error(err);
	}
});**/

export default store;
