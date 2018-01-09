const DEFAULT_STATE = {
    created: undefined,
};


export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "CREATE_SUBSCRIBER_PENDING":
            return {
                ...state,
                created: null
            };
        case "CREATE_SUBSCRIBER_REJECTED":
            return {
                ...state,
                created: false
            }
        case "CREATE_SUBSCRIBER_FULFILLED":
            return {
                ...state,
                created: true
            };

        default:
            return {...state};
    }
}
