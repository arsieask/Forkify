import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

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

        //Search for recipes
        await state.search.getResults();

        //Results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza');
// console.log(search);


