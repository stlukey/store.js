export default function reducer(state={
    page: [],
    fetching: false,
    fetched: false,
    saved: false,
    saving: false,

    pages: [],
    fetchingPages: false,
    fetchedPages: false,

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
                page: action.payload,

                fetchingPages: false,
                fetchedPages: false
            };

        case "FETCH_PAGES_PENDING":
            return {...state, fetchingPages:true, fetchedPages:false};

        case "FETCH_PAGES_REJECTED":
            return {...state, fetchingPages:false, error:action.payload,
                    fetchedPages:false}
        case "FETCH_PAGES_FULFILLED":
            return {
                ...state,
                fetchingPages: false,
                fetchedPages: true,
                pages: action.payload,

                fetching: false,
                fetched: false
            };

        case "SAVE_PAGE_PENDING":
            return {...state, saving:true, saved:false};

        case "SAVE_PAGE_REJECTED":
            return {...state, saving:false, error:action.payload,
                    saved:false}
        case "SAVE_PAGE_FULFILLED":
            return {
                ...state,
                saving: false,
                saved: true,
                page: action.payload,
            };


        default:
            return {...state};
    }
}
