const defaultState = {
    products: [],
    fetching: false,
    fetched: false,
    error: null,


    cost: {},
    costFetching: false,
    costFetched: false,
    costError: false
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


        case "FETCH_CART_COST_PENDING":
            return{...state, costFetching:true, costFetched:false};

        case "FETCH_CART_COST_REJECTED":
            return{...state, costFetching:false, costError:action.payload, costFetched:false};

        case "FETCH_CART_COST_FULFILLED":
            return{...state, costFetching:false, costFetched:true, cost:action.payload};


        default:
            return {...state};
    }
}
