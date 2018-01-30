import React from 'react';
import {Title} from '../app/bulma';


const address = link => <form>
    <Title>Delivery Address</Title>
    <div className="input-row">
        <input className="input"
               placeholder="Name"
               name="name"
               type="text"
               onChange={link('name')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 1"
               name="line1"
               type="text"
               onChange={link('line1')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 2"
               name="line2"
               type="text"
               onChange={link('line2')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Line 3"
               name="line3"
               type="text"
               onChange={link('line3')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="City"
               name="city"
               type="text"
               onChange={link('city')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="County"
               name="county"
               type="text"
               onChange={link('county')}/>
    </div>

    <div className="input-row">
        <input className="input"
               placeholder="Postcode"
               type="text"
               onChange={link('postcode')}/>
    </div>
</form>;

export default address;
