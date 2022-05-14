const apiRouter = require('express').Router();
const recipesRouter = require('./recipes-router');

apiRouter.get('/', (req, res) => {
	res.json({ message: 'ok' });
});

apiRouter.use('/recipes', recipesRouter);

module.exports = apiRouter;
