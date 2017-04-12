'use strict';

import * as util from 'util';

const REJECTED = new RegExp(/^Promise { <rejected> .*$/);
const PENDING = new RegExp(/^Promise { <pending> }/);

export type IResolveFn = (val?: any) => Promise<any>;
export type IRejectFn = (val?: any) => Promise<any>;

/** Takes a promise object and computes the current state */
export class PromiseState {

	private promise: Promise<any>;

	constructor(promise: Promise<any>) {
		if (promise && promise instanceof Promise) {
			this.promise = promise;
		} else {
			throw new Error(`Object must be a Promise`);
		}
	}

	public isPending() {
		return PENDING.test(util.inspect(this.promise));
	}

	public isRejected() {
		return REJECTED.test(util.inspect(this.promise));
	}

	public isResolved() {
		return (!this.isPending() && !this.isRejected());
	}

	public isComplete() {
		return (this.isRejected() || this.isResolved());
	}

	public toString() {
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
