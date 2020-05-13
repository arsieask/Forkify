import axios from 'axios';

export default class Recipe{
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log('There is an error somewhere here');
        }
    }

    calcTime() {
        //Using 15 minutes for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredient () {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz','oz', 'tsp', 'tsp', 'cup', 'pound'];


        const newIngredients = this.ingredients.map(el => {
            //Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = this.ingredient.replace(unit, unitsShort[i]);
            });

            //Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

            //Parse ingerdient
            return ingredient;
        });

        this.ingredients = newIngredients;
    }
}