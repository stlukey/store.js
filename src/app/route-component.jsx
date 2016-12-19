import React, {Component} from 'react';
import {RouteTransition} from 'react-router-transition';

class RouteComponent extends Component {
    render() {
          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ translateX: 100 }}
            atLeave={{ translateX: -10000 }}
            atActive={{ translateX: 0 }}
            mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)`})}
            key={this.props.key}
          >
                {this.props.children}
          </RouteTransition>
    }
}

export default RouteComponent;

