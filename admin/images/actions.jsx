import axios from '../../src/app/axios';
import newMessage from '../../src/messages/actions';


export const fetchImages = () => dispatch => {
    const url = `${API}/images`;

    dispatch({type: "FETCH_IMAGES_PENDING"})

    axios().get(url)
           .then((resp) => {
               dispatch({
                   type: "FETCH_IMAGES_FULFILLED",
                   payload: resp.data.data
               });
           })
           .catch((err) => {
               dispatch({type: "FETCH_IMAGES_REJECTED"});
               if(err.response)
                   dispatch(newMessage(err.response.data.message, 'danger'));
               console.error(err);
           });
}
