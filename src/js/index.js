import axios from 'axios';

async function getResults(query) {
    try {
    const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
    } catch (error) {
        alert(error);
    }
}

getResults('pizza');



// import string from './models/Search';
// //import {add as a, multiply as mult, ID} from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imports! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}!`);


// Search.js
// const res = await axios(`${PROXY}http://food2fork.com/api/search?key=${KEY}&q=${this.query}`);
// const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
// 
// Recipe.js
// const res = await axios(`${PROXY}http://food2fork.com/api/get?key=${KEY}&rId=${this.id}`);
// const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
