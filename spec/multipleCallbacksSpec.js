var multipleCallbacks = require(__dirname + '/../multipleCallbacks.js');

describe("Multiple Callbacks", function() {

	var cb = null;

	it("should call user callback when all Callbacks finish", function(done) {

		cb = multipleCallbacks(2, function () {
			done();
		});

		var f = function () {
			cb();
		};

		setTimeout(function () {
			f();
			f();
		}, 100);

	});

	it("shoud call a user callback exactly when the specified quantity of callback have been executed.", function(done) {

		var executionTimes = 0;

		cb = multipleCallbacks(2, function () {
			expect(executionTimes).toBe(2);
			done();
		});

		function f () {
			executionTimes++;
			cb();
		}

		setTimeout(function () {
			f();
			f();
			f();
		}, 100);

	});

	it("should not call the callback if the user pass false on quantity of callbacks execution", function() {

		var executed = false;

		cb = multipleCallbacks(false, function () {
			executed = true;
		});

		for (var i = 0; i < 1000; i++) {
			cb();
		}
		expect(executed).toBe(false);
	});

	it("user can change the quantity of callbacks execution", function() {

		var executed = false;

		cb = multipleCallbacks(3, function () {
			executed = true;
		});

		cb();
		cb();
		cb.setTimesToFire(4);
		cb();
		expect(executed).toBe(false);
		cb();
		expect(executed).toBe(true);

	});

	it("getTimesToFire should return the correct quantity", function() {

		cb = multipleCallbacks(2, function () {});

		expect(cb.getTimesToFire()).toBe(2);

	});

	it("getFiredTimes should return the correct quantity", function() {

		cb = multipleCallbacks(5, function () {});

		expect(cb.getFiredTimes()).toBe(0);
		cb();
		expect(cb.getFiredTimes()).toBe(1);
		cb();
		cb();
		expect(cb.getFiredTimes()).toBe(3);

	});

	it("sumTimesToFire should sum a cuantity to times to fire", function() {

		var executed = false;

		cb = multipleCallbacks(2, function () {
			executed = true;
		});

		cb();
		cb.sumTimesToFire(2);
		cb();
		expect(executed).toBe(false);
		cb();
		cb();
		expect(executed).toBe(true);
	});
});
