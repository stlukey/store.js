import axios from 'axios';

export function fetchAll() {
    const url = `${ADMIN_API_URL}/products`;
    return {
        type: "FETCH_ALL_PRODUCTS",
        payload: axios.get(url)
    };
}
