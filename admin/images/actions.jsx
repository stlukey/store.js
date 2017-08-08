import axios from '../../src/app/axios';
import newMessage from '../../src/messages/actions';


export const fetchImages = () => dispatch => {
    const url = `${API}/images`;

    dispatch({type: "FETCH_IMAGES_PENDING"});

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

export const uploadImage = (image) => dispatch => {
    const url = `${API}/images`;
    var data = new FormData();
    data.append('file', image);

    dispatch({type: "UPLOAD_IMAGE_PENDING"});

    axios().post(url, data)
           .then(resp => {
               dispatch({
                   type: "UPLOAD_IMAGE_FULFILLED",
                   payload: resp.data.data
               });
               dispatch(newMessage("Image upload successful.", 'success'));
               dispatch(fetchImages());
           })
           .catch(err => {
               dispatch({type: "UPLOAD_IMAGE_REJECTED",
                    payload: err
           });
               if (err.response)
                   dispatch(err.response.data.message, 'danger');
               console.error(err);
           });
}

export const deleteImage = (imageId) => dispatch => {
    const url = `${API}/images/${imageId}`;

    dispatch({type: "DELETE_IMAGE_PENDING"});

    axios().delete(url)
           .then(resp => {
               dispatch({
                   type: "DELETE_IMAGE_FULFILLED",
                   payload: resp.data.data
               });
               dispatch(newMessage("Image deleted.", 'info'));
               dispatch(fetchImages());
           })
           .catch(err => {
               dispatch({type: "DELETE_IMAGE_REJECTED",
                    payload: err
           });
               if (err.response)
                   dispatch(err.response.data.message, 'danger');
               console.error(err);
           });
}
