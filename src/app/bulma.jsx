import React, {Component} from 'react';

const _h1 = (props) => (<h1 {...props}/>);
const _label = (props) => (<label {...props}/>);
const _button = (props) => (<button {...props}/>);
const _p = (props) => (<p {...props}/>);
const _div = (props) => (<div {...props}/>);

const _makeComponent = (type, Element) => (props) => {
    Element = typeof Element !== 'undefined' ? Element : _div;
    var classes = typeof props.className !== 'undefined'
                       ? props.className : '';
    var classes = type + ' ' + classes;
    return (
        <Element {...props} className={classes}/>
)};

const _Columns = _makeComponent('columns');
const _pControl = _makeComponent('control', _p);
const _Column = _makeComponent('column');

export const Container = _makeComponent('container');
export const Panel = _makeComponent('panel');
export const Title = _makeComponent('title', _h1);
export const Label = _makeComponent('label', _label);
export const Button = _makeComponent('button', _button);

export const Columns = (props) => {
    var children = (props.children.constructor === Array ?
            props.children : [props.children]);
    console.log(children);
    return (
    <_Columns {...props}>
        {children.map((item, index) => (
            <_Column key={index}
                     {...item.props}/>
        ))}
    </_Columns>
)};

export const Input = (props) => (
    <_pControl>
        <input {...props} />
    </_pControl>
);

export const ControlButton = (props) => (
    <_pControl>
        <Button {...props}/>
    </_pControl>
);

