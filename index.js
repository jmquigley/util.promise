'use strict';

const util = require('util');

const REJECTED = new RegExp(/^Promise { <rejected> .*$/);
const PENDING = new RegExp(/^Promise { <pending> }/);

/** Takes a promise object and computes the current state */
class PromiseState {
	constructor(promise) {
		if (promise && promise instanceof Promise) {
			this.promise = promise;
		} else {
			throw new Error(`Object must be a Promise`);
		}
	}

	isPending() {
		return PENDING.test(util.inspect(this.promise));
	}

	isRejected() {
		return REJECTED.test(util.inspect(this.promise));
	}

	isResolved() {
		return (!this.isPending() && !this.isRejected());
	}

	isComplete() {
		return (this.isRejected() || this.isResolved());
	}

	toString() {
		let s = 'unknown';
		if (this.isPending()) {
			s = 'pending';
		} else if (this.isRejected()) {
			s = 'rejected';
		} else if (this.isResolved()) {
			s = 'resolved';
		}

		return s;
	}
}

module.exports = PromiseState;
