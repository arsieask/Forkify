import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

//Search controller


const controlSearch = async () => {
    //Get the query
    const query = searchView.getInput();

    if (query) {
        //New search object
        state.search = new Search(query);

        //UI
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //Search for recipes
            await state.search.getResults();

            //Results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Error during search');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


//Recipe controller

const r = new Recipe(47746);
r.getRecipe();
console.log(r);


const controlRecipe = async () => {
    //Get ID from the URL
    const id = window.location.hash.replace('#', '');
    console.log(id)

    if (id) {
        //Prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //New recipe object
        state.recipe = new Recipe(id);

        try {
            //Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            //Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe!')
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

//Simplify for multiple events

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

