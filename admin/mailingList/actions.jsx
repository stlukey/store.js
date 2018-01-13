import axios from '../../src/app/axios';
import newMessage from '../../src/messages/actions';

export function fetchMailingList() {
    const url = `${window.API}/subscribers`;
    return {
        type: "FETCH_MAILING_LIST",
        payload: axios().get(url)
    };
}


export const removeSubscriber = email => dispatch => {
    const url = `${API_URL}/subscribers/${email}`;

    dispatch({type: "DELETE_SUBSCRIBER_ADMIN_PENDING"});
    axios().delete(url)
           .then((resp) => {
               dispatch({
                   type: "DELETE_SUBSCRIBER_ADMIN_FULFILLED",
               });
               dispatch(newMessage(resp.data.message, "success"));
               dispatch(fetchMailingList());
           })
           .catch(err => {
               dispatch({type: "DELETE_SUBSCRIBER_ADMIN_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
           });
}


export const sendMail = (subject, content, router) => dispatch => {
    const url = `${window.API}/sendmail`;

    const data = {
        'subject': subject,
        'content': content
    }

    dispatch({type: "SEND_MAIL_PENDING"});
    axios().post(url, data)
           .then((resp) => {
               dispatch({
                   type: "SEND_MAIL_FULFILLED",
               });
               dispatch(newMessage(resp.data.message, "success"));
               router.push('/mailing-list');
           })
           .catch(err => {
               dispatch({type: "SEND_MAIL_REJECTED"});
               dispatch(newMessage(err.response.data.message, 'danger'));
           });
}
