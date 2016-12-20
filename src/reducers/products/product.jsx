export default function reducer(state={
    data: {},
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type) {
        case "FETCH_PRODUCT_PENDING":
            return {...state, fetching:true, fetched:false};

        case "FETCH_PRODUCT_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}

        case "FETCH_PRODUCT_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            };
        default:
            return {...state};
    }
}
