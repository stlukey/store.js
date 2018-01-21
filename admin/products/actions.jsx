import axios from '../../src/app/axios';
import newMessage from '../../src/messages/actions';
import {fetchProduct} from '../../src/products/actions';

export function fetchAll() {
    const url = `${window.API}/products`;
    return {
        type: "FETCH_ALL_PRODUCTS",
        payload: axios().get(url)
    };
}

export const saveProduct = (productId, data) => (dispatch) => {
    const url = `${window.API}/products/${productId}`;
    return dispatch({
        type: "SAVE_PRODUCT",
        payload: axios().put(url, data)
    }).then(dispatch(
        newMessage("Product updated.", 'success')
    ));
}

export const saveParcel = (productId, data) => (dispatch) => {
    const url = `${window.API}/parcel/${productId}`;
    return dispatch({
        type: "SAVE_PARCEL",
        payload: axios().post(url, data)
    }).then(dispatch(
        newMessage("Parcel updated.")
    ));
}


export function createProduct(data) {
    const url = `${window.API}/products`;
    return {
        type: "CREATE_PRODUCT",
        payload: axios().post(url, data)
    }
}

export const setImage = (productId, image) => (dispatch) => {
    const url = `${window.API}/products/${productId}`;
    const imageUrl = `/images/${image}.jpg`;
    const data = {images: [imageUrl]};

    return dispatch({
        type: "UPLOAD_PRODUCT_IMAGE",
        payload: axios().put(url, data)
    }).then(dispatch(
        newMessage("Image updated.", 'success')
    ));
}


export const saveRelated = (productId, relatedProductId) => (dispatch) => {
    const url = `${window.API}/products/${productId}/related/${relatedProductId}`;
    console.log("running");    
    return dispatch({
        type: "SAVE_RELATED",
        payload: axios().put(url)
     }).then(
        dispatch(fetchProduct(productId)))
    .then(
        dispatch(fetchAll()))
    .then(
        dispatch(newMessage("Related product Added.", 'success'))
    );
}


export const deleteRelated = (productId, relatedProductId) => (dispatch) => {
    const url = `${window.API}/products/${productId}/related/${relatedProductId}`;
    return dispatch({
        type: "DELETE_RELATED",
        payload: axios().delete(url)
    }).then(
        dispatch(fetchProduct(productId)))
    .then(
        dispatch(fetchAll()))
    .then(
        dispatch(newMessage("Related product Removed.", 'success'))
    );
}