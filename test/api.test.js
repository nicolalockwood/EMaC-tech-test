const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
	const { body } = await request.get('/api').expect(200);
	expect(body.message).toBe('ok');
});

describe('GET /api/recipes', () => {
	test('200: responds with an array of recipe objects', async () => {
		const { body } = await request.get('/api/recipes').expect(200);
		expect(body.recipes).toBeInstanceOf(Array);
		body.recipes.forEach((recipe) => {
			expect(recipe).toMatchObject({
				id: expect.any(String),
				imageUrl: expect.any(String),
				instructions: expect.any(String),
			});
			recipe.ingredients.forEach((ingredient) => {
				expect(ingredient).toMatchObject({
					name: expect.any(String),
					grams: expect.any(Number),
				});
			});
		});
	});

	describe('GET /api/recipes - QUERIES', () => {
		test('200: Accepts an excludes ingredient query and response with a list if recipe excluding this one item', async () => {
			const { body } = await request
				.get('/api/recipes?exclude_ingredients=banana')
				.expect(200);
			expect(body.recipes).toBeInstanceOf(Array);
			body.recipes.forEach((recipe) => {
				expect(recipe).toMatchObject({
					id: expect.any(String),
					imageUrl: expect.any(String),
					instructions: expect.any(String),
				});
				recipe.ingredients.forEach((ingredient) => {
					expect(ingredient).toMatchObject({
						name: expect.not.stringContaining('banana'),
						grams: expect.any(Number),
					});
				});
			});
		});
		test('200: Accepts an excludes ingredients query and response with a list if recipe excluding multiple items', async () => {
			const { body } = await request
				.get('/api/recipes?exclude_ingredients=banana,cinnamon')
				.expect(200);
			expect(body.recipes).toBeInstanceOf(Array);
			body.recipes.forEach((recipe) => {
				expect(recipe).toMatchObject({
					id: expect.any(String),
					imageUrl: expect.any(String),
					instructions: expect.any(String),
				});
				recipe.ingredients.forEach((ingredient) => {
					expect(ingredient).toMatchObject({
						name: expect.not.stringContaining('banana' || 'cinnamon'),
						grams: expect.any(Number),
					});
				});
			});
		});
	});
});

describe('ERROR HANDLING - GET /api/recipes', () => {
	test('404: return "Path not found" error when invalid URL is passed', async () => {
		const { body } = await request.get('/api/badpath').expect(404);
		expect(body.msg).toEqual('Path not found');
	});
	describe('ERROR HANDLING - GET /api/recipes - QUERIES', () => {
		test('400: return "Invalid ingredient to exclude" error when invalid sort by value is passed', async () => {
			const { body } = await request
				.get('/api/recipes?exclude_ingredients=incorrect')
				.expect(400);

			expect(body.msg).toBe('Invalid ingredient to exclude');
		});
	});
});

describe('GET /api/recipes/:recipe_id', () => {
	test('200: responds with a recipe object, based on recope ID', async () => {
		const { body } = await request.get('/api/recipes/recipe-88').expect(200);
		expect(body.recipe).toBeInstanceOf(Array);
		expect(body.recipe).toEqual([
			{
				id: 'recipe-88',
				imageUrl: 'http://www.images.com/12',
				instructions: 'blend with oat milk and ice, sprinkle with salt',
				ingredients: [
					{ name: 'blueberries', grams: 114 },
					{ name: 'coffee', grams: 20 },
					{ name: 'kale', grams: 48 },
				],
			},
		]);
	});
});

describe('ERROR HANDLING - GET /api/recipes/:recipe_id', () => {
	test('404: return "Path not found" error when valid URL that isnt available is passed', async () => {
		const { body } = await request.get('/api/recipes/badpath').expect(404);
		expect(body.msg).toEqual('Recipe not found');
	});
});

// describe('POST api/recipes', () => {
// 	test('201: responds with an object of a new recipe based on infomation passed from client', async () => {
// 		const recipeUpdate = {
// 			imageUrl: 'http://www.images.com/101',
// 			instructions: 'Whizz in the blender with a large and full of ice',
// 			ingredients: [
// 				{ name: 'blueberries', grams: 150 },
// 				{ name: 'lemon juice', grams: 100 },
// 				{ name: 'strawberries', grams: 100 },
// 				{ name: 'love', grams: 500 },
// 			],
// 		};
// 		const { body } = await request
// 			.post('/api/recipes')
// 			.send(recipeUpdate)
// 			.expect(201);
// 		expect(body.newRecipe).toBeInstanceOf(Object);
// 		expect(body.newRecipe).toMatchObject({ id: 'recipe-101' });
// 	});
// });
