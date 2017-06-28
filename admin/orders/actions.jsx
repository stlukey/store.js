import axios from 'axios';

export function fetchOrders(){
    const url = `${API}/orders`;

    return {
        type: "ADMIN_FETCH_ORDERS",
        payload: axios.get(url)
    };
}

