# util.promise [![Build Status](https://travis-ci.org/jmquigley/util.promise.svg?branch=master)](https://travis-ci.org/jmquigley/util.promise) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/util.promise.svg)](https://www.npmjs.com/package/util.promise) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.promise/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.promise?branch=master)

> Utility functions for handling promises

A class that will take a promise object and derive its current state
by using [Node inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options).  It's used for debugging/testing with promises to see the state of a promise.


## Installation

To install as an application dependency with cli:
```
$ npm install --save-dev util.promise
```

To build the app and run all tests:
```
$ npm run all
```


## Usage
```
let promise = Promise.resolve('finished state');
let state = new PromiseState(promise);

t.true(promise instanceof Promise);
t.true(state instanceof PromiseState);
t.pass(state.isResolved());

promise
	.then(ret => {
		t.pass(ret);
	})
	.catch(err => {
		t.fail(`${t.context.title}: ${err}`);
	});
```

## API

- `PromiseState({promise)` - creates a instance of the class
- `isPending()` - returns true if the promise is in a pending state
- `isRejected()` - returns true if the promise is in a rejected state
- `isResolved()` - returns true if the promise is in a resolved state
- `isComplete()` - returns true if teh promise is in rejected or resolved.

This also exposes two typescript interface definitions for the resolve/reject functions:

- `IResolveFn` - a function signature for the resolve function
- `IRejectFn` - a function signature for the reject function
