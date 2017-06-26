const DEFAULT_STATE = {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
};

export default function reducer(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case "FETCH_ORDER_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "FETCH_ORDER_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "FETCH_ORDER_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data,
            };

        case "PLACE_ORDER_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "PLACE_ORDER_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "PLACE_ORDER_FULFILLED":
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
