import React, {Component} from 'react';

export const TextFeildGroup = ({value, label, error, success}) => (
    <div class="field">
        <label class="label">{label}</label>
        <input class="input is-success" type="text" value={value}>
        {success ? <p class="help is-danger">{success}</p> : null}
        {error ? <p class="help is-danger">{error}</p> : null}
    </div>
);
