import newMessage from '../messages/actions';
import axios, {setToken, removeToken, getToken} from '../app/axios';

export const subscribe = (email) => dispatch => {
    const url = `${API_URL}/subscribers/${email}`;

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

export const unsubscribe = (email, router) => dispatch => {
    const url = `${API_URL}/subscribers/${email}`;

    dispatch({type: "DELETE_SUBSCRIBER_PENDING"})
    axios().delete(url)
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
    router.push('/');
}
