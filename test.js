'use strict';

import test from 'ava';

const fs = require('fs-extra');
const Fixture = require('util.fixture');
const PromiseState = require('./index');

test.after.always(t => {
	let directories = Fixture.cleanup();
	directories.forEach(directory => {
		t.false(fs.existsSync(directory));
	});
});

test('Test a bad promise creation exception', t => {
	try {
		let a = [];
		let state = new PromiseState(a);
		state.toString();
	} catch (err) {
		t.pass(err.message);
	}
});

test('Test pending promise state', t => {
	let promise = new Promise(() => {
	});
	let state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.true(state.isPending());
});

test('Test rejected promise state', t => {
	let promise = Promise.reject('nothing to see');
	let state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.pass(state.isRejected());

	promise.catch(err => {
		t.pass(err);
	});
});

test('Test resolved promise state', t => {
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
});

test('Test complete promise state', t => {
	let promise = Promise.resolve('complete state');
	let state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.pass(state.isComplete());

	promise
		.then(ret => {
			t.pass(ret);
		})
		.catch(err => {
			t.fail(`${t.context.title}: ${err}`);
		});
});
