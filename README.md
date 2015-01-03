MultipleCallbacks
=================

execute a callback after the execution of other callbacks.

Usage
=====

Instance `MultipleCallbacks` with the quantity of callbacks that will be executed before and the callback.

`new MultipleCallbacks(times, callback);` return a function.
Every time that this function is executed count one callback as executed.

``` javascript

var cb = new MultipleCallbacks(2, makeHamburgers);

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

var cb = new MultipleCallbacks(times, callback);

cb.setTimesToFire(newTimes);

```

Other methods are:

`getTimesToFire`: Return the needed quantity of callbacks executions to execute your callback.

`getFiredTimes`: Return the times that the callback returned by `MultipleCallbacks` has been fired.

`sumTimesToFire`: Sum a quantity to the needed quantity of callbacks executions to execute your callback.
