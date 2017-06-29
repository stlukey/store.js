import axios from 'axios';

const AXIOS_CONFIG = {
    withCredentials: true
};


export function fetchShipments(){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_FETCH_SHIPMENTS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function fetchShipment(id){
    const url = `${API}/shipments/${id}`;

    return {
        type: "ADMIN_FETCH_SHIPMENT",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function createShipment(id){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_CREATE_SHIPMENT",
        payload: axios.post(url, AXIOS_CONFIG)
    };
}

export function dispatchShipment(id){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_DISPATCH_SHIPMENT",
        payload: axios.put(url, AXIOS_CONFIG)
    };
}
