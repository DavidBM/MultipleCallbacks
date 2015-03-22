MultipleCallbacks
=================

[![Build Status](https://travis-ci.org/DavidBM/MultipleCallbacks.svg)](https://travis-ci.org/DavidBM/MultipleCallbacks)

**Execute a callback after the execution of other callbacks.**

_Note: If you're reading this, probably you want to use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instead of this library_

Usage
=====

Install with `npm install multiple-callbacks`

execute `multipleCallbacks` with the quantity of callbacks that will be executed before and the callback.

`multipleCallbacks(times, callback, name);` return a function.
Every time that this function is executed count one callback as executed.

``` javascript

	var multipleCallbacks = require('multiple-callbacks');

	var cb = multipleCallbacks(2, makeHamburgers);

	getMeat();
	getBread();

	function getMeat () {
		/*Async operation*/
		setTimeout(cb, 1000);
	}

	function getBread () {
		/*Async operation*/
		setTimeout(cb, 1000);
	}

	function makeHamburgers () {
		console.log('I’m lovin’ it!');
	}

```


You can change the execution times needed to execute the callback at any time with:

``` javascript

	var multipleCallbacks = require('multiple-callbacks');

	var cb = multipleCallbacks(times, callback);

	cb.setTimesToFire(newTimes);

```

Other methods are:

`getTimesToFire`: Return the needed quantity of callbacks executions to execute your callback.

`getFiredTimes`: Return the times that the callback returned by `MultipleCallbacks` has been fired.

`sumTimesToFire`: Sum a quantity to the needed quantity of callbacks executions to execute your callback.

For debbug porposes you can pass a name to the constructor. `multipleCallbacks(times, callback, name);` It uses de [debug](https://www.npmjs.com/package/debug) module for show the name on every callback execution.

The name of debug function (for view the log) are `MultipleCallbacks:log` and `MultipleCallbacks:warning`. See the [debug](https://www.npmjs.com/package/debug#conventions) documentation for more info.

Indeterminated quantity of callbacks executions
===============================================

If you don't know the quantity of times that the callback will be executed, you can pass false to 'multiple-callbacks' to cancel the execution on the final callback until you provide the quantity of calls to execute the final callback.

A weird example:

``` javascript

	var multipleCallbacks = require('multiple-callbacks');

	var exTime = 0;

	var callback = multipleCallbacks(false, function () {
		done();
	});

	services.forEach(function (service) {
		if(service.updated === false){
			service.doSyncOrAsyncStuff(callback)
			exTime++;
		}
	});

	cb.setTimesToFire(exTime);
```

Your async functions return data
================================

Let's view the first example with data:

``` javascript

	var multipleCallbacks = require('multiple-callbacks');

	var cb = multipleCallbacks(2, makeHamburgers);

	getMeat();
	getBread();

	function getMeat () {
		/*Async operation*/
		setTimeout(function () {
			cb(new Meat());
		}, 1000);
	}

	function getBread () {
		/*Async operation*/
		setTimeout(function () {
			cb(new Bread());
		}, 1000);
	}

	function makeHamburgers (ingredients) {
		var hamburger = new Hamburger();

		for (var i = ingredients.length - 1; i >= 0; i--) {
			var ingredient = ingredients[i];
			hamburger.addIngredient(ingredient);
		}

		console.log('I’m lovin’ it!');
	}

```

**If only one callback has returned data, multipleCallbacks don't pass an Array to the user callback. Instead pass the data itself.**
