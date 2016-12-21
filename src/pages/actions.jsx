import axios from "axios";

export default function fetchPage(page) {
    const url = `${API_URL}/pages/${page}`;
    return {
        type: "FETCH_PAGE",
        payload: axios.get(url)
    };
}
