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
    console.log(data);
    return dispatch({
        type: "SAVE_PRODUCT",
        payload: axios.put(url, data)
    }).then(dispatch(
        newMessage("Product updated.")
    ));
}
