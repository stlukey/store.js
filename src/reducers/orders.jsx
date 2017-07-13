const DEFAULT_STATE = {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
};

export default function reducer(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case "FETCH_ORDERS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        case "FETCH_ORDERS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "FETCH_ORDERS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data.data,
            };

        default:
            return {...state};
    }
}
