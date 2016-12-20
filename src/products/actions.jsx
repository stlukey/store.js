import axios from "axios";

export function fetchLatest() {
    const url = `${API_URL}/products/latest`;
    return {
        type: "FETCH_LATEST_PRODUCTS",
        payload: axios.get(url)
    };
}

export function fetchAll() {
    const url = `${API_URL}/products`;
    return {
        type: "FETCH_ALL_PRODUCTS",
        payload: axios.get(url)
    };
}


export function fetchPopular() {
    const url = `${API_URL}/products/popular`;
    return {
        type: "FETCH_POPULAR_PRODUCTS",
        payload: axios.get(url)
    };
}

export function fetchCategories() {
    const url = `${API_URL}/categories`;
    return {
        type: "FETCH_CATEGORIES",
        payload: axios.get(url)
    };
}

export function fetchProduct(product_id) {
    const url = `${API_URL}/products/${product_id}`;
    return {
        type: "FETCH_PRODUCT",
        payload: axios.get(url)
    };
}
