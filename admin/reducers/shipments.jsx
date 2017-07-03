const DEFAULT_STATE = {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
    current: null
};

const isShipped = data => {
    return "dispatch_datetime" in data;
}

const notShipped = data => !isShipped(data);

export default function reducer(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case "ADMIN_FETCH_SHIPMENTS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "ADMIN_FETCH_SHIPMENTS_REJECTED":
            return {
                ...state,
                fetching:false,
                error:action.payload,
                fetched:false
            }
        case "ADMIN_FETCH_SHIPMENTS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data.data.filter(isShipped),
                current: action.payload.data.data.find(notShipped)
            };

        default:
            return {...state};
    }
}
