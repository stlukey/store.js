export default function reducer(state={
    categories: [],
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type) {
        case "FETCH_CATEGORIES_PENDING":
            return {...state, fetching:true};

        case "FETCH_CATEGORIES_REJECTED":
            return {...state, fetching:false, error:action.payload}

        case "FETCH_CATEGORIES_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                categories: action.payload.data
            };
        default:
            return {...state};
    }
}
