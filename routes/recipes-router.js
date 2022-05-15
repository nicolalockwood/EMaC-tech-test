const recipesRouter = require('express').Router();
const express = require('express');

const {
	getRecipes,
	getRecipesByID,
	postRecipe,
} = require('../controllers/recipes.controller');

recipesRouter.route('/').get(getRecipes);
// .post(postRecipe);

recipesRouter.route('/:recipe_id').get(getRecipesByID);

module.exports = recipesRouter;
