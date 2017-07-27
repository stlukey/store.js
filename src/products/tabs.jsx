import React, {Component} from 'react'

const switchTab = (tabs, tabId) => tabs.setState({current:tabId});

const TabLink = ({current, tabId, children, onClick}) =>
    console.log(tabId, current, current == tabId) && current == tabId ?
      <li className="is-active"><a onClick={onClick}>{children}</a></li>
    : <li><a onClick={onClick}>{children}</a></li>;

const Recipes = ({product}) =>
    <div className="box">
        <p className="menu-label">Recipes</p>
        <ul className="menu-list">
            {product.recipes.map((recipe, index) => (
                <li key={index}>
                    <a href={recipe.url} target="_blank">
                        {recipe.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>;

const Reviews = ({product}) =>
    <div className="box">
        <p className="menu-label">Reviews</p>
        <ul className="menu-list">
            {product.reviews.map((review, index) => (
                <li key={index}>
                    <div className="card is-fullwidth">
                        <header className="card-header">
                            <p className="card-header-title">
                                {review.rating} / 5 {"     "}
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="title">
                                "{review.description}"
                            </div>
                            <br />
                            <div className="subtitle">
                                {review.user}
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>;

export default class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        };
        this.tabs = [
            <Recipes product={props.product}/>,
            <Reviews product={props.product}/>
        ];

        this.switch.bind(this)
    }

    switch(tabId) {
        return this.setState({current:tabId});
    }

    render() {
        var {current} = this.state;
        window.current = current;
        var content = this.tabs[current];
        return <div className="container">
            <div className="tabs">
                <ul>
                    <TabLink current={current} tabId={0} onClick={() => this.switch(0)}>Recipes</TabLink>
                    <TabLink current={current} tabId={1} onClick={() => this.switch(1)}>Reviews</TabLink>
                </ul>
            </div>
            {content}
         </div>;
    }
}
