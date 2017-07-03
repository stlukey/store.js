export default function reducer(state={
    products: [],
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type) {
        case "ADMIN_FETCH_ALL_PRODUCTS_PENDING":
            return {...state, fetching:true, fetched:false};

        case "ADMIN_FETCH_ALL_PRODUCTS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}

        case "ADMIN_FETCH_ALL_PRODUCTS_FULFILLED":
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
