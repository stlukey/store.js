import React, {Component} from 'react';

class Expire extends Component {
    static defaultProps = {
        delay: 1000
    };
    constructor(){
        super();
        this.state = {visible: true};
    }

    componentDidMount() {
      this.setTimer();
    }
    
    setTimer() {
        // clear any existing timer
        this._timer = null ? clearTimeout(this._timer) : null;

        // hide after `delay` milliseconds
        this._timer = setTimeout(function(){
            this.setState({visible: false});
            this._timer = null;
        }.bind(this), this.props.delay);
    }
    componentWillUnmount() {
        clearTimeout(this._timer);
    }
    render() {
        return this.state.visible 
            ? <span>{this.props.children}</span>
            : null;
    }
}

export default Expire;

