import newMessage from '../messages/actions';
import axios, {setToken, removeToken, getToken} from '../app/axios';
//import unload from 'unload';
import {sendReminderEmail} from '../cart/actions';

export const createUser = (data, router) => dispatch => {
    const url = `${API_URL}/user`;

    dispatch({type: "CREATE_USER_PENDING"})
    axios().post(url, data)
           .then((resp) => {
               dispatch({
                   type: "CREATE_USER_FULFILLED",
               });
               dispatch(newMessage(resp.data.message, "success"));
               if(router) router.push('/login');
           })
           .catch(err => {
               dispatch({type: "CREATE_USER_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
           })
}

export const fetchUser = () => dispatch => {
    const url = `${API_URL}/user`;

    dispatch({type: "FETCH_USER_PENDING"})
    if(getToken() === null)
        return dispatch({type: "FETCH_USER_REJECTED"});

    axios().get(url)
           .then((resp) => {
               dispatch({
                   type: "FETCH_USER_FULFILLED",
                   payload: resp.data.data
               });
           })
           .catch((err) => {
               removeToken();
               dispatch({type: "FETCH_USER_REJECTED"});
               console.error(err);
           })
}

export const loginUser = ({email, password}) => dispatch => {
    const data = {
        password: password
    };
    const url = `${API_URL}/token/${email}`;

    dispatch({type: "LOGIN_USER_PENDING"})

    axios().post(url, data)
           .then((resp) => {
               setToken(resp.data.data);
               dispatch(fetchUser());
               dispatch({
                   type: "LOGIN_USER_FULFILLED",
                   payload: resp.data.data
               });
               window.onunload = sendReminderEmail;
               dispatch(newMessage("Log in successful.", "success"));
           })
           .catch((err) => {
               dispatch({type: "LOGIN_USER_REJECTED"});
               console.log(err);
               dispatch(newMessage(err.response.data.message, 'danger'));
           })
}

export const logoutUser = () => dispatch => {
    sendReminderEmail();
    window.onunload = null;
    removeToken();
    dispatch({type: "LOGOUT_USER"});
    dispatch(newMessage("You have been logged out.", 'info'));
}

export const activateUser = (emailToken, router) => dispatch => {
    const url = `${API_URL}/confirm/${emailToken}`;

    dispatch({type: "ACTIVATE_USER_PENDING"})
    axios().post(url)
           .then((resp) => {
               dispatch({type: "ACTIVATE_USER_FULFILLED"});
               dispatch(newMessage(resp.data.message, "success"));
               if(router) router.push('/login');
           })
           .catch(err => {
               dispatch({type: "ACTIVATE_USER_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
               if(router) router.push('/login');
           })
}

export const updateUserDetails = (data) => (dispatch) => {
    const url = `${API_URL}/user`;

    dispatch({type: "UPDATE_USER_DETAILS_PENDING"})
    axios().put(url, data)
           .then((resp) => {
                dispatch({type: "UPDATE_USER_DETAILS_FULFILLED",
                    payload: resp.data.data
                });
                dispatch(newMessage("Details updated.", "success"));
           })
           .catch(err => {
                console.error(err);
                dispatch({type: "UPDATE_USER_DETAILS_REJECTED"});
                if (err.response !== undefined)
                    dispatch(newMessage(err.response.data.message, 'danger'));

           })
}

export const resetUserPassword = (data, token, router) => dispatch => {
    const url = `${API_URL}/recover/${token}`;

    dispatch({type: "RESET_USER_PASSWORD_PENDING"})
    axios().put(url, data)
           .then((resp) => {
                dispatch({type: "RESET_USER_PASSWORD_FULFILLED"});
                dispatch(newMessage(resp.data.message, "success"));
           })
           .catch(err => {
                dispatch({type: "RESET_USER_PASSWORD_REJECTED"});
                if (err.response !== undefined)
                    dispatch(newMessage(err.response.data.message, 'danger'));

           });
    router.push('/login');
}

export const requestUserReset = (email) => dispatch => {
    const url = `${API_URL}/recover/${email}`;

    dispatch({type: "REQUEST_USER_RESET_PENDING"})
    axios().post(url)
           .then((resp) => {
                dispatch({type: "REQUEST_USER_RESET_FULFILLED"});
                dispatch(newMessage(resp.data.message, "info"));
           })
           .catch(err => {
                dispatch({type: "REQUEST_USER_RESET_REJECTED"});
                if (err.response !== undefined)
                    dispatch(newMessage(err.response.data.message, 'danger'));

           });
}
