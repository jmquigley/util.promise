# util.promise [![Build Status](https://travis-ci.org/jmquigley/util.promise.svg?branch=master)](https://travis-ci.org/jmquigley/util.promise) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![NPM](https://img.shields.io/npm/v/util.promise.svg)](https://www.npmjs.com/package/util.promise) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.promise/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.promise?branch=master) 

> Utility functions for handling promises

A class that will take a promise object and derive its current state
by using [Node inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options).

## Installation

To install as a global package and cli:
```
$ npm install --global util.promise
```

To install as an application dependency with cli:
```
$ npm install --save-dev util.promise
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

- ``PromiseState({promise)`` - creates a instance of the class
- ``isPending()`` - returns true if the promise is in a pending state
- ``isRejected()`` - returns true if the promise is in a rejected state
- ``isResolved()`` - returns true if the promise is in a resolved state
- ``isComplete()`` - returns true if teh promise is in rejected or resolved.
