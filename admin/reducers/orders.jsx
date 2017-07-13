const DEFAULT_STATE = {
    data: {},
    notShipped: null,
    fetching: false,
    fetched: false,
    error: null,
};

const notShipped = data => !data.shipping.shipment;

export default function reducer(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case "ADMIN_FETCH_ORDERS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "ADMIN_FETCH_ORDERS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "ADMIN_FETCH_ORDERS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data.data,
                notShipped: action.payload.data.data.filter(notShipped)
            };

        default:
            return {...state};
    }
}
