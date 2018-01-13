export default function reducer(state={
    data: [],
    fetching: false,
    fetched: false,

    error: null
}, action){
    switch(action.type) {
        case "FETCH_MAILING_LIST_PENDING":
            return {...state, fetching:true, fetched:false};

        case "FETCH_MAILING_LIST_REJECTED":
            return {...state, fetching:false, error:action.payload.data,
                    fetched:false}
        case "FETCH_MAILING_LIST_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                data: action.payload.data.data,
            };


        case "DELETE_SUBSCRIBER_ADMIN":
            return {
                data: [],
                fetching: false,
                fetched: false,

                error: null
            };



        default:
            return {...state};
    }
}
