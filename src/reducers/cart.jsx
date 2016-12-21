const defaultState = {
    products: [],
    fetching: false,
    fetched: false,
    error: null
};

export default function reducer(state=defaultState, action){
    switch(action.type) {
        case "FETCH_CART_PENDING":
            return {...state, fetching:true, fetched:false};

        case "FETCH_CART_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}

        case "FETCH_CART_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                products: action.payload
            };


        case "ADD_TO_CART_PENDING":
            return {...state, fetching:true, fetched:false};

        case "ADD_TO_CART_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}

        case "ADD_TO_CART_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                products: action.payload
            };


        case "REMOVE_FROM_CART_PENDING":
            return {...state, fetching:true, fetched:false};

        case "REMOVE_FROM_CART_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}

        case "REMOVE_FROM_CART_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                products: action.payload
            };

        default:
            return {...state};
    }
}
