import axios from "../app/axios";
import newMessage from '../messages/actions';

export default function fetchOrder(order) {
    const url = `${API}/orders/${order}`;
    return {
        type: "FETCH_ORDER",
        payload: axios().get(url)
    };
}

export function fetchOrders() {
    const url = `${API}/orders`;
    return {
        type: "FETCH_ORDERS",
        payload: axios().get(url)
    };
}


export const placeOrder = (data, router) => dispatch => {
    const url = `${API}/orders`;
    dispatch({type: "PLACE_ORDER_PENDING"})
    axios().post(url, data)
           .then(resp => {
               dispatch({
                   type: "PLACE_ORDER_FULFILLED",
                   payload: resp
               });
               dispatch(newMessage(resp.data.message, "success"));
               let oid = resp.data.data._id.$oid;
               if(router) router.push(`/orders/${oid}`);
           })
           .catch(err => {
               console.error(err);
               let msg = err.response ? err.response.data.message :
               'There was an error connecting to the server. Please try again later.';
               dispatch({
                   type: "PLACE_ORDER_REJECTED",
                   payload: msg
               });
           })
}
