import axios from '../../src/app/axios';

export function fetchShipments(){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_FETCH_SHIPMENTS",
        payload: axios().get(url)
    };
}

export function fetchShipment(id){
    const url = `${API}/shipments/${id}`;

    return {
        type: "ADMIN_FETCH_SHIPMENT",
        payload: axios().get(url)
    };
}

export function createShipment(id){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_CREATE_SHIPMENT",
        payload: axios().post(url)
    };
}

export function dispatchShipment(id){
    const url = `${API}/shipments`;

    return {
        type: "ADMIN_DISPATCH_SHIPMENT",
        payload: axios().put(url)
    };
}
