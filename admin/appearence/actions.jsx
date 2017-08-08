import axios from '../../src/app/axios';
import newMessage from '../../src/messages/actions';


export const fetchImages = () => dispatch => {
    const url = `${API}/appearance/images`;

    dispatch({type: "FETCH_IMAGES_PENDING"})

    axios().get(url)
           .then((resp) => {
               dispatch({
                   type: "FETCH_APPEARANCE_IMAGES_FULFILLED",
                   payload: resp.data.data
               });
           })
           .catch((err) => {
               dispatch({type: "FETCH_APPEARANCE_IMAGES_REJECTED"});
               if(err.response)
                   dispatch(newMessage(err.response.data.message, 'danger'));
               console.error(err);
           });
}

export const setImages = (data) => dispatch => {
    const url = `${API}/appearance/images`;

    dispatch({type: "SET_APPEARANCE_IMAGES_PENDING"})

    axios().put(url, data)
           .then((resp) => {
               dispatch({
                   type: "SET_APPEARANCE_IMAGES_FULFILLED",
                   payload: resp.data.data
               });
               dispatch(newMessage(resp.data.message, 'success'));
           })
           .catch((err) => {
               dispatch({type: "SET_APPEARANCE_IMAGE_REJECTED"});
               if(err.response)
                   dispatch(newMessage(err.response.data.message, 'danger'));
               console.error(err);
           });
}
