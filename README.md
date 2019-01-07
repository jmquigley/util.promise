# util.promise

> Utility functions for handling promises

[![Build Status](https://travis-ci.org/jmquigley/util.promise.svg?branch=master)](https://travis-ci.org/jmquigley/util.promise)
[![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/)
[![Test Runner](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.promise.svg)](https://www.npmjs.com/package/util.promise)
[![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.promise/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.promise?branch=master)

A class that will take a promise object and derive its current state
by using [Node inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options).  It's used for debugging/testing with promises to see the state of a promise.

It also provides two typescript function signatures: `ResolveFn` and `RejectFn`.  This can be used with promise creation to give return type information for the resolve/reject calls.


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency with cli:
```
$ yarn add util.promise
```

To build the app and run all tests:
```
$ yarn run all
```


## Usage

#### Check the state of a Promise
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

#### Using types in Promise resolution
```javascript
    ...
    return new Promise((resolve: ResolveFn<string>, reject: RejectFn<string>) => {
        assert(resolve);
        assert(reject);
        t.pass();

        resolve('successful test');
    });
```

In this snippet both functions will resolve/reject with strings.


## API

- `PromiseState({promise)` - creates a instance of the class
- `isPending()` - returns true if the promise is in a pending state
- `isRejected()` - returns true if the promise is in a rejected state
- `isResolved()` - returns true if the promise is in a resolved state
- `isComplete()` - returns true if teh promise is in rejected or resolved.

This also exposes two typescript interface definitions for the resolve/reject functions:

- `PromiseFn<T>` - function signature for either a resolve/reject function in a promise.
- `ResolveFn<T>` - a function signature for the resolve function.
- `RejectFn<T>` - a function signature for the reject function
