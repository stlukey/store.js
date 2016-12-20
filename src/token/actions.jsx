import axios from 'axios';
import newMessage from '../messages/actions';

var deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function fetchToken(credentials) {
    const {email, password} = credentials;
    const data = {
        password: password
    };

    const url = `${API_URL}/token/${email}`;

    return (dispatch) => {
        axios.post(url, JSON.stringify(data))
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
