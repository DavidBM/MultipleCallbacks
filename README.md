MultipleCallbacks
=================

execute a callback after the execution of other callbacks.

Usage
=====

Install with `npm install multiple-callbacks`

execute `multipleCallbacks` with the quantity of callbacks that will be executed before and the callback.

`multipleCallbacks(times, callback);` return a function.
Every time that this function is executed count one callback as executed.

``` javascript

var multipleCallbacks = require('multiple-callbacks');

var cb = multipleCallbacks(2, makeHamburgers);

function getMeat () {
    /*Async operation*/
    setTimeout(cb, 1000);
}

function getBread () {
    /*Async operation*/
    setTimeout(cb, 1000);
}

function makeHamburgers () {
    console.log('I’m lovin’ it!')
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

Indeterminated quantity of callbacks executions
===============================================

If you don't know the quantity of times that the callback will be executed, you can pass false to 'multiple-callbacks' to cancel the execution on the final callback until you provide the quantity of calls to execute the final callback.

A weird example:

``` javascrip

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
