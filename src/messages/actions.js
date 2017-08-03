export default function newMessage(msg, cat) {
    const action = {type: "NEW_MESSAGE", content: msg, category:cat};
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return (dispatch) => {
        return new Promise((resolve, reject) =>
            resolve(dispatch(action)));
    }
}
