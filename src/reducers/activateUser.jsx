const DEFAULT_STATE = {
    fetching: null,
    error: null,
};

export default function reducer(state=DEFAULT_STATE, action) {
    switch(action.type) {
        case "ACTIVATE_USER_PENDING":
            return {
                ...state,
                fetching: true,
            };
        case "ACTIVATE_USER_REJECTED":
            return {
                ...state,
                fetching:false,
                error:action.payload,
            }
        case "ACTIVATE_USER_FULFILLED":
            return {
                ...state,
                error: null,
                fetching: false,
            };

        default:
            return {...state};
    }
}
