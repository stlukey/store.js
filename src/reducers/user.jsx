const DEFAULT_STATE = {
    details: null, // {id, password, first_name, last_name, contact_number}
    token: null,
    error: null,
    fetching: true,

    created: false,
    activated: null,
    updated: false
};

export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "CREATE_USER_PENDING":
            return {
                ...state,
                updated: null,
                details: null,
                token: null,
                error: null,
                fetching: true,
                created: null
            };
        case "CREATE_USER_REJECTED":
            return {
                ...state,
                fetching:false,
                fetched:false,
                created: false
            }
        case "CREATE_USER_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                created: true
            };


        case "FETCH_USER_PENDING":
            return {
                ...state,
                updated: null,
                details: null,
                error: null,
                fetching: true,
                fetched: false
            };
        case "FETCH_USER_REJECTED":
            return {
                ...state,
                fetching:false,
                fetched:false,
                token: false
            }
        case "FETCH_USER_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                details: action.payload,
                token: localStorage.getItem('token')
            };


        case "LOGIN_USER_PENDING":
            return {
                ...state,
                updated: null,
                fetching: true,
                token: null,
                details: null
            };
        case "LOGIN_USER_REJECTED":
            return {
                ...state,
                fetching:false,
                fetched:false,
                token: null
            }
        case "LOGIN_USER_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                token: action.payload
            };


        case "LOGOUT_USER":
            return {
                ...state,
                updated: null,
                token: null,
                details: null,
                fetching: false,
            };


        case "ACTIVATE_USER_PENDING":
            return {
                ...state,
                updated: null,
                fetching: true,
                activated: null,
                details: null
            };
        case "ACTIVATE_USER_REJECTED":
            return {
                ...state,
                fetching:false,
                fetched:false,
            }
        case "ACTIVATE_USER_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                activated: true
            };


        case "UPDATE_USER_DETAILS_PENDING":
            return {
                ...state,
                updated: null,
                fetching: true
            };
        case "UPDATE_USER_DETAILS_REJECTED":
            return {
                ...state,
                fetching:false,
                fetched:false,
                updated: false
            }
        case "UPDATE_USER_DETAILS_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
                fetched: true,
                details: action.payload,
                updated: true
            };

        case "RESET_USER_PASSWORD_PENDING":
            return {
                ...state,
                fetching: true
            };
        case "RESET_USER_PASSWORD_REJECTED":
            return {
                ...state,
                fetching:false,
            }
        case "RESET_USER_PASSWORD_FULFILLED":
            return {
                ...state,
                fetching: false,
            };

        default:
            return {...state};
    }
}
