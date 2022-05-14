const fs = require('fs/promises');

exports.selectRecipes = (exclude_ingredients) => {
	return fs.readFile('./data/data.json', 'utf8').then((data) => {
		let recipes = JSON.parse(data);

		//To handle queries
		if (exclude_ingredients) {
			//If multiple quieries turn string to array
			const excluededIngredients = exclude_ingredients.split(',');
			// List of all valid ingreditents listen in all recipes
			let validIngList = [];
			const validQueryIng = recipes.map((recipe) => {
				recipe.ingredients.forEach((ingredient) =>
					validIngList.push(ingredient.name)
				);
			});

			//Count of unfound excluded ingreditents for error handling
			let numberOfExcludedIngredients = 0;
			excluededIngredients.forEach((excludedIng) => {
				if (!validIngList.includes(excludedIng)) {
					numberOfExcludedIngredients++;
				}
			});

			excluededIngredients.forEach((excludedIng) => {
				//Filter recipes to exclude the query item if come returns true for that item
				recipes = recipes.filter(
					(recipe) =>
						!recipe.ingredients.some((obj) => obj.name === excludedIng)
				);
			});

			//Custom error handle caught in controller.then
			return numberOfExcludedIngredients > 0
				? Promise.reject({
						status: 400,
						msg: 'Invalid ingredient to exclude',
				  })
				: recipes;
		}

		return recipes;
	});
};
