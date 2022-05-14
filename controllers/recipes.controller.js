const { selectRecipes } = require('../models/recipes.model');

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
