const recipesRouter = require('express').Router();
const express = require('express');

const {
	getRecipes,
	getRecipesByID,
} = require('../controllers/recipes.controller');

recipesRouter.route('/').get(getRecipes);

recipesRouter.route('/:recipe_id').get(getRecipesByID);

module.exports = recipesRouter;
