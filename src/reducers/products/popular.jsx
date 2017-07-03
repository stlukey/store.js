export default function reducer(state={
    products: [],
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type) {
        case "FETCH_POPULAR_PRODUCTS_PENDING":
            return {...state, fetching:true, fetched:false};

        case "FETCH_POPULAR_PRODUCTS_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}

        case "FETCH_POPULAR_PRODUCTS_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                products: action.payload.data
            };
        default:
            return {...state};
    }
}
