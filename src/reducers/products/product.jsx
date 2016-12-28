export default function reducer(state={
    data: {},
    fetching: false,
    fetched: false,
    saving: false,
    saved: false,
    error: null
}, action){
    switch(action.type) {
        case "FETCH_PRODUCT_PENDING":
            return {...state, fetching:true, fetched:false};
        case "FETCH_PRODUCT_REJECTED":
            return {...state, fetching:false, error:action.payload, fetched:false}
        case "FETCH_PRODUCT_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload
            };

        case "SAVE_PRODUCT_PENDING":
            return {...state, saving:true, saved:false};
        case "SAVE_PRODUCT_REJECTED":
            return {...state, saving:false, error:action.payload, saved:false}
        case "SAVE_PRODUCT_FULFILLED":
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload
            };


        case "UPLOAD_PRODUCT_IMAGE_PENDING":
            return {...state, saving:true, saved:false};
        case "UPLOAD_PRODUCT_IMAGE_REJECTED":
            return {...state, saving:false, error:action.payload, saved:false}
        case "UPLOAD_PRODUCT_IMAGE_FULFILLED":
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload
            };


        default:
            return {...state};
    }
}
