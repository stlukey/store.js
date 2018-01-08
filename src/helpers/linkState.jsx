export default (obj, key) => (e) => {
    var state = obj.state;
    state[key] = e.target.value;
    obj.setState(state)
};
