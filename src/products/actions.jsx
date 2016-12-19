import axios from "axios";

export function fetchLatest() {
    return {
        type: "FETCH_LATEST_PRODUCTS",
        payload: axios.get(STORE_API + '/products/latest')
    };
}

export function fetchPopular() {
    return {
        type: "FETCH_POPULAR_PRODUCTS",
        payload: axios.get(STORE_API + '/products/popular')
    };
}

export function fetchCategories() {
    return {
        type: "FETCH_CATEGORIES",
        payload: axios.get(STORE_API + '/categories')
    };
}


