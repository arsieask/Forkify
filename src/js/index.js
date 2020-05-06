import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

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

        //Search for recipes
        await state.search.getResults();

        //Results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza');
// console.log(search);


