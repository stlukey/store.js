import axios from "axios";

const AXIOS_CONFIG = {
    withCredentials: true
};

export default function fetchOrder(order) {
    const url = `${API}/orders/${order}`;
    return {
        type: "FETCH_ORDER",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function fetchOrders() {
    const url = `${API}/orders`;
    return {
        type: "FETCH_ORDERS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}


export function placeOrder(data) {
    const url = `${API}/orders`;
    return {
        type: "PLACE_ORDER",
        payload: axios.post(url, data, AXIOS_CONFIG)
    };
}
