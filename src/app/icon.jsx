import React from 'react';

export default (props) => (
    <span className={"icon is-" + props.size}>
        <i className={"fa fa-" + props.type} />
    </span>
)
