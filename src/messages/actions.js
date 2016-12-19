export default function newMessage(msg, cat) {
    return {type: "NEW_MESSAGE", content: msg, category:cat};
}

