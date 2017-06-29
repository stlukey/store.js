import localStorage from 'local-storage';

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if(serializedState === null)
			return undefined;

		return JSON.parse(serializedState);
	}
	catch (err) {
		console.error(err);
		return undefined;
	}
}

export const saveSate = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.error(err);
	}
}
