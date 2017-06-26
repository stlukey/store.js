import axios from 'axios';

export function fetchOrders(){
    const url = `${API}/orders`;

    return {
        type: "FETCH_ORDERS",
        payload: axios.get(url)
    };
}

