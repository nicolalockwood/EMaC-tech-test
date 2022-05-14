const recipesRouter = require('express').Router();
const express = require('express');

const { getRecipes } = require('../controllers/recipes.controller');

recipesRouter.route('/').get(getRecipes);

module.exports = recipesRouter;
