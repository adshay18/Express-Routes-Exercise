const { request } = require('express');
const express = require('express');
const ExpressError = require('./errorDetail');

const app = express();

// Root Route
app.get('/', function(req, res) {
	return res.send(
		'Visit /mean, /median, /mode and pass a list of nums into the query string to get a result. (url/mean?nums=1,2,3,4)'
	);
});

// Calculate mean
app.get('/mean', function(req, res, next) {
	try {
		// Get query string
		let nums = req.query.nums;
		if (!nums) throw new ExpressError('Invalid query string, please try /mean?nums=1,2,3', 400);
		nums = nums.split(',');
		// Attempt to coerce all inputs as integers
		let numbers = nums.map(function(x) {
			return parseInt(x);
		});
		// Test that we received all inputs as numbers
		for (let i = 0; i < numbers.length; i++) {
			if (isNaN(numbers[i])) throw new ExpressError(`Invalid query string, ${nums[i]} is not a number`, 400);
		}
		// Calculate the mean from the cleaned data
		const sum = numbers.reduce((partialSum, a) => partialSum + a, 0);
		const mean = sum / numbers.length;
		return res.send(`Mean = ${mean}`);
	} catch (e) {
		next(e);
	}
});

// Calculate median
app.get('/median', function(req, res, next) {
	try {
		// Get query string
		let nums = req.query.nums;
		if (!nums) throw new ExpressError('Invalid query string, please try /median?nums=1,2,3', 400);
		nums = nums.split(',');
		// Attempt to coerce all inputs as integers
		let numbers = nums.map(function(x) {
			return parseInt(x);
		});
		// Test that we received all inputs as numbers
		for (let i = 0; i < numbers.length; i++) {
			if (isNaN(numbers[i])) throw new ExpressError(`Invalid query string, ${nums[i]} is not a number`, 400);
		}
		// Calculate the median from the cleaned data
		const order = numbers.sort((a, b) => a - b);
		let median;
		if (order.length % 2 === 0) {
			let v1 = order.length / 2 - 1;
			let v2 = order.length / 2;
			median = (order[v1] + order[v2]) / 2;
		} else {
			let m = (order.length + 1) / 2 - 1;
			median = order[m];
		}

		return res.send(`Median = ${median}`);
	} catch (e) {
		next(e);
	}
});

// Calculate Mode
app.get('/mode', function(req, res, next) {
	try {
		// Get query string
		let nums = req.query.nums;
		if (!nums) throw new ExpressError('Invalid query string, please try /mode?nums=1,2,3', 400);
		nums = nums.split(',');
		// Attempt to coerce all inputs as integers
		let numbers = nums.map(function(x) {
			return parseInt(x);
		});
		// Test that we received all inputs as numbers
		for (let i = 0; i < numbers.length; i++) {
			if (isNaN(numbers[i])) throw new ExpressError(`Invalid query string, ${nums[i]} is not a number`, 400);
		}
		// Calculate the mode from the cleaned data
		const modeObj = {};
		for (let i = 0; i < numbers.length; i++) {
			if (!modeObj[numbers[i]]) {
				modeObj[numbers[i]] = 1;
			} else {
				modeObj[numbers[i]]++;
			}
		}
		const mode = new Set();
		const maxCount = Math.max(...Object.values(modeObj));
		for (let i = 0; i < numbers.length; i++) {
			if (modeObj[numbers[i]] === maxCount) {
				mode.add(numbers[i]);
			}
		}
		console.log(mode);
		return res.send(`Mode = ${Array.from(mode).join(', ')}`);
	} catch (e) {
		next(e);
	}
});

// 404 not found
app.use((req, res, next) => {
	const e = new ExpressError('Page Not Found', 404);
	next(e);
});

app.use(function(err, req, res, next) {
	let status = err.status || 500;
	let message = err.msg;

	return res.status(status).json({
		error: { message, status }
	});
});

app.listen(3000, function() {
	console.log('Server started on port 3000.');
});
