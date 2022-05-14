const server = require('express')();
const apiRouter = require('./routes/api');

server.use('/api', apiRouter);

//Handle Custom Errors
server.use((err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
});

//Handle Unexpected errors
server.use((err, req, res, next) => {
	// console.log(err);
	res.status(500).send({ msg: 'Internal Server Error' });
});

server.all('/*', (req, res) => {
	res.status(404).send({ msg: 'Path not found' });
});

module.exports = server;
