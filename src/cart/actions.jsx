import axios from "../app/axios";
import store from "../store";

export function sendReminderEmail() {
    const url = `${API_URL}/cart/email`;

    if (localStorage.getItem('token') !== null) {
        var request = new XMLHttpRequest();
        request.open("POST",`${API_URL}/cart/email`,false);
        request.setRequestHeader("content-type","application/json");
        request.setRequestHeader("Authorization",`Bearer ${localStorage.token}`);
        request.send();
    }
}

export function fetchCartCost() {
    const url = `${API_URL}/cart/cost`;
    return {
        type: "FETCH_CART_COST",
        payload: axios().get(url)
    };
}

export function fetchCart() {
    const url = `${API_URL}/cart`;
    return {
        type: "FETCH_CART",
        payload: axios().get(url)
    };
}

export function addToCart(productId, quantity) {
    const url = `${API_URL}/cart/${productId}/${quantity}`;
    return {
        type: "ADD_TO_CART",
        payload: axios().post(url)
    }
}

export function removeFromCart(productId) {
    const url = `${API_URL}/cart/${productId}`;
    return {
        type: "REMOVE_FROM_CART",
        payload: axios().delete(url)
    }
}

export function setItemQuantityInCart(productId, quantity) {
    const url = `${API_URL}/cart/${productId}`;
    return {
        type: "SET_ITEM_QUANTITY_IN_CART",
        payload: axios().put(url, {quantity})
    }
}
