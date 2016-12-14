import React, {Component} from 'react';
import ReactCSSTransitionGroup from
    'react/lib/ReactCSSTransitionGroup';
import classNames from 'classnames';
import './Messages.css';

const MESSAGE_TIMEOUT = 3000;

class Expire extends Component {
    static defaultProps = {
        delay: 1000
    };
    constructor(){
        super();
        this.state = {visible: true};
    }
    componentWillReceiveProps(nextProps) {
        // reset the timer if children are changed
        if (nextProps.children !== this.props.children) {
          this.setTimer();
          this.setState({visible: true});
    }
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
            ? <div>{this.props.children}</div>
            : <span />;
    }
}

class Message extends Component {
    static defaultProps = {
        delayCount: 1
    };
    render() {
        var classes = classNames({
            'alert': true,
            'alert-dismissable': true,
            'alert-success': this.props.category === 'success',
            'alert-info': this.props.category === 'info',
            'alert-warning': this.props.category === 'warning',
            'alert-danger': this.props.category === 'danger'
        });
        return (
            <Expire delay={MESSAGE_TIMEOUT * this.props.delayCount}>
                <ReactCSSTransitionGroup
                    transitionName="message"
                    transitionEnter={false}
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionLeaveTimeout={1000}
                >
                    <div className={classes}>
                        <span className="glyphicon glyphicon-exclamation-sign"
                              aria-hidden="true"></span>
                        {" "}{this.props.content}
                    </div>
                </ReactCSSTransitionGroup>
            </Expire>
        );
    }
}

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            messages: window.initialMessages
        };
    }

    add(content, category='info') {
        var state = this.state;
        var msg = {content:content, category:category};
        state.messages.push(msg);
        this.setState(state);
    }

    render() {
        const msgs = this.state.messages.map((msg, i) => (
            <Message content={msg.content}
                     category={msg.category}
                     key={i}
                     delayCount={i + 1}/>
        ));
        return (
            <div className="flashes" role="alert">
                    {msgs}
            </div>
        );
    }
}

export default Messages;

