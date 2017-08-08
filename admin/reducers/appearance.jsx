const DEFAULT_STATE = {
    data: null,
    updated: null
};

export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "FETCH_APPEARANCE_IMAGES_PENDING":
            return {
                ...state,
                data: null,
            };
        case "FETCH_APPEARANCE_IMAGES_REJECTED":
            return {
                ...state,
                data:false,
            };
        case "FETCH_APPEARANCE_IMAGES_FULFILLED":
            return {
                ...state,
                data: action.payload,
            };

        case "SET_APPEARANCE_IMAGES_PENDING":
            return {
                ...state,
                updated: null,
            };
        case "SET_APPEARANCE_IMAGES_REJECTED":
            return {
                ...state,
                updated:false,
            };
        case "SET_APPEARANCE_IMAGES_FULFILLED":
            return {
                ...state,
                updated: true,
            };

        default:
            return {...state};
    }
}
