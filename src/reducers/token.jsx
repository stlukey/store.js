const DEFAULT_STATE = {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
    valid: null,
    created: false
};

export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "FETCH_TOKEN_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
                valid: null
            };

        case "FETCH_TOKEN_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}

        case "FETCH_TOKEN_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload,
                valid: true
            };

        case "FETCH_TOKEN_INVALID_LOGIN":
            return {
                ...state,
                fetching: false,
                error: null,
                valid: false
            };

        case "LOGOUT_TOKEN":
            return {...DEFAULT_STATE};


        case "CREATE_TOKEN_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
                valid: null
            };

        case "CREATE_TOKEN_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "CREATE_TOKEN_FULFILLED":
            return {
                ...DEFAULT_STATE,
                created: true
            };


        case "FETCH_TOKEN_DETAILS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "FETCH_TOKEN_DETAILS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "FETCH_TOKEN_DETAILS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data,
            };

        case "UPDATE_TOKEN_DETAILS_PENDING":
            return {
                ...state,
                fetching: true,
                fetched: false,
            };
        case "UPDATE_TOKEN_DETAILS_REJECTED":
            return {...state, fetching:false, error:action.payload,
                    fetched:false}
        case "UPDATE_TOKEN_DETAILS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                data: action.payload.data,
            };

        default:
            return {...state};
    }
}
