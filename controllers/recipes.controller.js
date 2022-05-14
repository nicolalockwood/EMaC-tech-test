const { selectRecipes, selectRecipesByID } = require('../models/recipes.model');

exports.getRecipes = (req, res, next) => {
	const { exclude_ingredients } = req.query;
	return selectRecipes(exclude_ingredients)
		.then((recipes) => {
			res.status(200).send({ recipes });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getRecipesByID = (req, res, next) => {
	const { recipe_id } = req.params;

	return selectRecipesByID(recipe_id)
		.then((recipe) => {
			res.status(200).send({ recipe });
		})
		.catch((err) => {
			next(err);
		});
};
