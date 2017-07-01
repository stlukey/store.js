import axios from 'axios';

const AXIOS_CONFIG = {
    withCredentials: true
};


export function fetchLatest() {
    const url = `${window.API}/products/latest`;
    return {
        type: "FETCH_LATEST_PRODUCTS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function fetchAll() {
    const url = `${window.API}/products`;
    return {
        type: "FETCH_ALL_PRODUCTS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}


export function fetchPopular() {
    const url = `${window.API}/products/popular`;
    return {
        type: "FETCH_POPULAR_PRODUCTS",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function fetchCategories() {
    const url = `${window.API}/categories`;
    return {
        type: "FETCH_CATEGORIES",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}

export function fetchProduct(product_id) {
    const url = `${window.API}/products/${product_id}`;
    return {
        type: "FETCH_PRODUCT",
        payload: axios.get(url, AXIOS_CONFIG)
    };
}
