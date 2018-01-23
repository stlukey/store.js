import React,{Component} from 'react';

import './Popup.scss';

const onClick = to => () => window.open(
    to, "popup", 'width=800,height=600'
);

export default ({to, children}) => <a 
    target="_blank"
    href={to}
    onClick={onClick(to)}
    className={'popup-link'}
>
    {children}
</a>;