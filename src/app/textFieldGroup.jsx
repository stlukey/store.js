import React, {Component} from 'react';

const TextFieldGroup = ({value, label, error, success, onChange, type}) => (
    <div className="field">
        <label className="label">{label}: </label>
        <input className="input is-success" type={type} value={value} onChange={onChange}/>
        {success ? <p className="help is-danger">{success}</p> : null}
        {error ? <p className="help is-danger">{error}</p> : null}
    </div>
);

export default TextFieldGroup;
