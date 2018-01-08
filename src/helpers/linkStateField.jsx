export default (obj, fieldKey) => (key) => (e) => {
    var state = obj.state;
    state[fieldKey][key] = e.target.value;
    obj.setState(state);
};
