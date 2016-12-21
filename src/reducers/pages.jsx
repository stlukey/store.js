export default function reducer(state={
    page: [],
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type) {
        case "FETCH_PAGE_PENDING":
            return {...state, fetching:true, fetched:false};

        case "FETCH_PAGE_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}

        case "FETCH_PAGE_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                page: action.payload
            };
        default:
            return {...state};
    }
}
