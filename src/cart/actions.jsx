import axios from "axios";

const AXIOS_CONFIG = {
    withCredentials: true
};

export function fetchCart() {
    const url = `${API_URL}/cart`;
    return {
        type: "FETCH_CART",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function addToCart(productId) {
    const url = `${API_URL}/cart/${productId}`;
    return {
        type: "ADD_TO_CART",
        payload: axios.post(url, null, AXIOS_CONFIG)
    }
}

export function removeFromCart(productId) {
    const url = `${API_URL}/cart/${productId}`;
    return {
        type: "REMOVE_FROM_CART",
        payload: axios.delete(url, AXIOS_CONFIG)
    }
}
