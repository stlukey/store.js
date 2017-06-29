import axios from 'axios';


const AXIOS_CONFIG = {
    withCredentials: true
};


export function fetchOrders(){
    const url = `${API}/orders`;

    return {
        type: "ADMIN_FETCH_ORDERS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

