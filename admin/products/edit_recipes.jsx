import React, {Component} from 'react';

import {saveProduct} from './actions';

import {
    Title,
    Button
} from '../../src/app/bulma';

function fixUrl(url) {
    if(!url.match(/^[a-zA-Z]+:\/\//))
        url = 'http://' + url;
    return url;
}

class EditableRecipe extends Component {
    constructor(props) {
        super(props);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            recipe: props.recipe,
            editing: false
        };
    }

    toggleEdit() {
        if(this.state.editing) {
            if(!this.state.recipe.name)
                return alert("Recipe name is required!");

            if(!this.state.recipe.url)
                return alert("Recipe URL is required!");
        }

        var state = this.state;
        state.editing = !state.editing;
        this.setState(state);
    }

    handleChange = (target) => (event) => {
        const value = target === 'url' ?
            fixUrl(event.target.value) : event.target.value;

        var state = this.state;
        state.recipe[target] = value;
        this.setState(state);

        this.props.onChange(state.recipe);
    }

    render() {
        var header = !this.state.editing ? (
            <p className="card-header-title">
                {this.state.recipe.name}
            </p>
        ) : (
            <input className="card-header-title"
                   type="text"
                   defaultValue={this.state.recipe.name}
                   onChange={this.handleChange('name')} />
        );

        var content = !this.state.editing ? (
            <a href={this.state.recipe.url} target="_blank">
                {this.state.recipe.url}
            </a>
        ) : (
            <input type="url"
                   className="edit-recipe-url"
                   defaultValue={this.state.recipe.url}
                   onChange={this.handleChange('url')} />
        );

        return (
            <div className="card is-fullwidth input-row">
                <header className="card-header">
                    {header}
                </header>
                <div className="card-content">
                    {content}
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item"
                       onClick={this.toggleEdit}>
                       {this.state.editing ? 'Done' : 'Edit'}       
                    </a>
                    <a className="card-footer-item"
                       onClick={this.props.onDelete}>Delete</a>
                </footer>
            </div>
        );
    }
}

class NewRecipe extends Component {
    constructor(props) {
        super(props);
        
        this.handleDone = this.handleDone.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            url: '',
            name: ''
        }
    }

    handleChange = (target) => (event) => {
        const value = target === 'url' ?
            fixUrl(event.target.value) : event.target.value;

        var state = this.state;
        state[target] = value;
        this.setState(state);

    }

    handleDone() {
        if(!this.state.name)
            return alert("Recipe name is required!");

        if(!this.state.url)
            return alert("Recipe URL is required!");

       this.props.onChange(this.state);
    }

    render() {
        return (
            <div className="card is-fullwidth input-row">
                <header className="card-header">
                    <input className="card-header-title"
                       type="text"
                       placeholder="Recipe Name"
                       onChange={this.handleChange('name')} />
                </header>
                <div className="card-content">
                    <input type="url"
                           className="edit-recipe-url"
                           placeholder="http://example.com/recipe"
                           onChange={this.handleChange('url')} />
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item"
                       onClick={this.handleDone}>
                       Done    
                    </a>
                    <a className="card-footer-item"
                       onClick={this.props.onCancel}>
                       Cancel    
                    </a>
                </footer>
            </div>
        );
    }
}

class ProductEditRecipes extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.toggleNew = this.toggleNew.bind(this);
        this.newRecipe = this.newRecipe.bind(this);
        this.save = this.save.bind(this);
        this.cancelNewRecipe = this.cancelNewRecipe.bind(this);
        
        this.state = {
            recipes: props.data.recipes,
            displayNew: false,
            i: 0
        };
    }
    
    inc(v) {
        var state = this.state;
        state.i += v;
        this.setState(state);
        return state.i;
    }

    newRecipe(recipe) {
        this.setState({
            recipes: this.state.recipes.concat([recipe]),
            displayNew: false
        });
    }

    cancelNewRecipe() {
        var state = this.state;
        state.displayNew = false;
        this.setState(state);
    }

    handleChange = (index) => (recipe) => {
        var state = this.state;
        state.recipes[index] = recipe;
        this.setState(state)
    }

    handleDelete = (index) => () => {
        console.log(`Deleteing ${index}`)
        window.recipes = this.state.recipes.concat([]);
        var state = this.state;
        state.recipes.splice(index, 1);
        this.setState(state)
        this.inc(state.recipes.length)
    }

    toggleNew() {
        var state = this.state;
        state.displayNew = !state.displayNew;
        this.setState(state);
    }

    save() {
        const productId = this.props.data._id.$oid;
        const data = {'recipes': this.state.recipes};

        this.props.dispatch(saveProduct(productId,
                                        data));
    }

    render() {
        var recipes = this.state.recipes.map((recipe, index) => (
            <EditableRecipe key={this.state.i + index }
                            recipe={recipe}
                            onChange={this.handleChange(index)}
                            onDelete={this.handleDelete(index)} />
        ));

        var newRecipe = this.state.displayNew ? 
            <NewRecipe onChange={this.newRecipe}
                       onCancel={this.cancelNewRecipe}/> : <span />;

        var buttons = !this.state.displayNew ?
            <span>
                <Button className="is-primary"
                        onClick={this.save}>Save</Button>
                <Button onClick={this.toggleNew}>
                    Add New Recipe
                </Button>
            </span> : <span />;

        return (
            <div>
                <Title>Recipes</Title>
                {recipes}
                {newRecipe}
                {buttons}
            </div>
        );
    }
}

export default ProductEditRecipes;
