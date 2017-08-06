const DEFAULT_STATE = {
    data: null,
};

export default function reducer(state=DEFAULT_STATE, action){
    switch(action.type) {
        case "FETCH_IMAGES_PENDING":
            return {
                ...state,
                data: null,
            };

        case "FETCH_IMAGES_REJECTED":
            return {
                ...state,
                data:false,
            };

        case "FETCH_IMAGES_FULFILLED":
            return {
                ...state,
                data: action.payload,
            };

        default:
            return {...state};
    }
}
