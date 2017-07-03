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
                data: action.payload.data
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
                data: action.payload.data
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
                data: action.payload.data
            };

        case "CREATE_PRODUCT_PENDING":
            return {...state, saving:true, saved:false};
        case "CREATE_PRODUCT_REJECTED":
            return {...state, saving:false, error:action.payload, saved:false}
        case "CREATE_PRODUCT_FULFILLED":
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.data
            };


        case "SAVE_PARCEL_PENDING":
            return {...state, saving:true, saved:false};
        case "SAVE_PARCEL_REJECTED":
            return {...state, saving:false, error:action.payload, saved:false}
        case "SAVE_PARCEL_FULFILLED":
            return {
                ...state,
                saving: false,
                saved: true,
                data: action.payload.data
            };

        default:
            return {...state};
    }
}
