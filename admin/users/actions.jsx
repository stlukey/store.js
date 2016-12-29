import axios from 'axios';

export default function fetchUsers(){
    const url = `${API}/users`;

    return {
        type: "FETCH_USERS",
        payload: axios.get(url)
    };
}

