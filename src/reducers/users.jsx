const DEFAULT_STATE = {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
};

export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "FETCH_USERS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "FETCH_USERS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "FETCH_USERS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data,
            };

        default:
            return {...state};
    }
}
