const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require('unirest');
const API_KEY = '6bb785a5-6a05-492e-bc53-aee653c7fcd2';

app.get('/api/associations/:word', (req, res) => {
	const word = req.params.word;
	const request = unirest
		.get(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_KEY}&lang=en&text=${word}`)
		.then((response) => {
			const results = response.body.response[0].items || []; // grab array of results
			console.log(`Num results=${results.length}`);
			res.json(results);
		})
		.catch((error) => {
			console.log(`error=${error}`);
			res.json({ status: 'Error', message: `${error}` });
		});
});

app.listen(port, () => {
	console.log(`word-app listening on port ${port}`);
});
