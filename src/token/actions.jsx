import axios from 'axios';
import newMessage from '../messages/actions';

var deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const AXIOS_CONFIG = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};

export function fetchToken(credentials) {
    const {email, password} = credentials;
    const data = {
        password: password
    };

    const url = `${API_URL}/token/${email}`;

    return (dispatch) => {
        axios.post(url, JSON.stringify(data), AXIOS_CONFIG)
             .then((response) => {
                dispatch(() => {
                    return new Promise( (resolve, reject) => {
                        resolve(
                            dispatch({
                                type: "FETCH_TOKEN_FULFILLED",
                                payload: response.data
                            })
                        )
                    })
                }).then(() => {
                    dispatch(newMessage(
                        "Logged in successfully.",
                        'success'
                    ));
                });
             })
             .catch((error) => {
                console.log(error);
                if(error.response && error.response.status !== 401)
                    return dispatch({
                        type: "FETCH_TOKEN_REJECTED",
                        payload: error
                    });
                dispatch({
                    type: "FETCH_TOKEN_INVALID_LOGIN"
                });
                dispatch(newMessage(
                    "Invalid email / password.",
                    'danger'
                ))
             });
    };
}

export function removeToken(dispatch) {
    return new Promise((resolve, reject) => {
        resolve(dispatch({
            type: "LOGOUT_TOKEN"
        }));
    }).then(() => {
        deleteCookie('token');
        dispatch(newMessage(
            "Logged out successfully.",
            'success'
        ));
    });
}

export function createToken(data) {
    const url = `${API_URL}/user`;

    return {
        type: "CREATE_TOKEN",
        payload: axios.post(url, data)
    };
}

export function fetchTokenDetails() {
    const url = `${API_URL}/user`;

    return {
        type: "FETCH_TOKEN_DETAILS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function updateTokenDetails(data) {
    const url = `${API_URL}/user`;

    return {
        type: "UPDATE_TOKEN_DETAILS",
        payload: axios.put(url, data, AXIOS_CONFIG)
    };
}
