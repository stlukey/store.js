import axios from 'axios';
import newMessage from '../../src/messages/actions';

export function fetchAll() {
    const url = `${window.API}/products`;
    return {
        type: "FETCH_ALL_PRODUCTS",
        payload: axios.get(url)
    };
}

export const saveProduct = (productId, data) => (dispatch) => {
    const url = `${window.API}/products/${productId}`;
    return dispatch({
        type: "SAVE_PRODUCT",
        payload: axios.put(url, data)
    }).then(dispatch(
        newMessage("Product updated.")
    ));
}

export function createProduct(data) {
    const url = `${window.API}/products`;
    return {
        type: "CREATE_PRODUCT",
        payload: axios.post(url, data)
    }
}

export const uploadImage = (productId, image, index) => (dispatch) => {
    const url = `${window.API}/products/${productId}/${index}`;
    var data = new FormData();
    data.append('file', image);

    return dispatch({
        type: "UPLOAD_PRODUCT_IMAGE",
        payload: axios.put(url, data)
    }).then(dispatch(
        newMessage("Image upload complete.")
    ));
}
