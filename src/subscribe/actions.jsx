import newMessage from '../messages/actions';
import axios, {setToken, removeToken, getToken} from '../app/axios';

export const subscribe = (email) => dispatch => {
    const url = `${API_URL}/subscriber/${email}`;

    dispatch({type: "CREATE_SUBSCRIBER_PENDING"})
    axios().post(url)
           .then((resp) => {
               dispatch({
                   type: "CREATE_SUBSCRIBER_FULFILLED",
               });
               dispatch(newMessage(resp.data.message, "success"));
           })
           .catch(err => {
               dispatch({type: "CREATE_SUBSCRIBER_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
           })
}

export const unsubscribe = (email) => dispatch => {
    const url = `${API_URL}/subscriber/${email}`;

    dispatch({type: "DELETE_SUBSCRIBER_PENDING"})
    axios().post(url)
           .then((resp) => {
               dispatch({
                   type: "DELETE_SUBSCRIBER_FULFILLED",
               });
               dispatch(newMessage(resp.data.message, "success"));
           })
           .catch(err => {
               dispatch({type: "DELETE_SUBSCRIBER_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
           })
}
