'use strict';

import test from 'ava';
import {Fixture} from 'util.fixture';

const fs = require('fs-extra');
const PromiseState = require('./index');

test.after.always.cb(t => {
	Fixture.cleanup((err, directories) => {
		if (err) {
			return t.fail(`Failure cleaning up after test: ${err.message}`);
		}

		directories.forEach(directory => {
			t.false(fs.existsSync(directory));
		});

		t.end();
	});
});

test('Test a bad promise creation exception', t => {
	try {
		const a = [];
		const state = new PromiseState(a);
		state.toString();
	} catch (err) {
		t.pass(err.message);
	}
});

test('Test pending promise state', t => {
	const promise = new Promise(() => {
	});
	const state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.true(state.isPending());
	t.is(state.toString(), 'pending');
});

test('Test rejected promise state', t => {
	const promise = Promise.reject('nothing to see');
	const state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.true(state.isRejected());
	t.is(state.toString(), 'rejected');

	promise.catch(err => {
		t.pass(err);
	});
});

test('Test resolved promise state', t => {
	const promise = Promise.resolve('finished state');
	const state = new PromiseState(promise);

	t.true(promise instanceof Promise);
	t.true(state instanceof PromiseState);
	t.pass(state.isResolved());
	t.is(state.toString(), 'resolved');

	promise
		.then(ret => {
			t.pass(ret);
		})
		.catch(err => {
			t.fail(`${t.context.title}: ${err}`);
		});
});

test('Test complete promise state', t => {
	const promise = Promise.resolve('complete state');
	const state = new PromiseState(promise);

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
