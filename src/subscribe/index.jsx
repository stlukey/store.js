import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loading from '../app/loading';
import linkState from '../helpers/linkState';
import {subscribe} from './actions';

@connect(store => ({
    'subscriber': store.subscriber
}))
class Subscribe extends Component {
    constructor() {
        super();

        this.state = {
            'email': '',
        }
    }

    render() {
        const {email} = this.state;
        const {created} = this.props.subscriber;
        const {dispatch} = this.props;

        if(created === undefined) return <span>
          SIGN UP TO OUR EMAIL FOR NEWS & EXCLUSIVES
            <div className="field has-addons">
              <p className="control">
                <input className="input" type="text" placeholder="Add your email here..."
                       onChange={linkState(this, 'email')} value={email}/>
              </p>
              <p className="control">
                <a className="button" onClick={() => dispatch(subscribe(email))}>
                  Subscribe
                </a>
              </p>
            </div>
        </span>;

        if(created === null) return <Loading />;

        if(created)
            return <span>
            YOU ARE NOW SIGNED UP TO OUR EMAIL FOR NEWS AND EXCLUSIVES
            </span>

        return <span />;
    }
}

export default Subscribe;
