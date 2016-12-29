import axios from "axios";
import newMessage from '../messages/actions';

export default function fetchPage(page) {
    const url = `${API}/pages/${page}`;
    return {
        type: "FETCH_PAGE",
        payload: axios.get(url)
    };
}

export function fetchPages(page) {
    const url = `${API}/pages`;
    return {
        type: "FETCH_PAGES",
        payload: axios.get(url)
    };
}

export const savePage = (pageId, content) => dispatch => {
    const url = `${API}/pages/${pageId}`;
    const data = {content};

    return dispatch({
        type: "SAVE_PAGE",
        payload: axios.put(url, data)
    }).then(dispatch(
        newMessage('Page Updated.')
    ));
}
