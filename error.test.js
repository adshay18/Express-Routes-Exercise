const ExpressError = require('./errorDetail');

describe('Generate new Error', function() {
	let err;
	beforeEach(function() {
		err = new ExpressError('Error, something went wrong.', 500);
	});
	test('Has class ExpressError', function() {
		expect(err.constructor.name).toBe('ExpressError');
	});

	test('Generates message', function() {
		expect(err.msg).toBe('Error, something went wrong.');
	});
	test('Generates status code', function() {
		expect(err.status).toBe(500);
	});
});
