export default function reducer(state=[], action){
    switch(action.type) {
        case "NEW_MESSAGE":
            return [...state, {content:action.content, category:action.category}];
        default:
            return state;
    }
}
