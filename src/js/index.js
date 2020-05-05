import Search from './models/Search';

const state = {};

const controlSearch = async () => {
    //Get the query
    const query = 'pizza'

    if (query) {
        //New search object
        state.search = new Search(query);

        //UI

        //Search for recipes
        await state.search.getResults();

        //Results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza');
// console.log(search);


