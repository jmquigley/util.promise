import * as fs from "fs-extra";
import {PromiseState, RejectFn, ResolveFn} from "./index";

test("Test a bad promise creation exception", () => {
	expect(() => {
		const a: any = [];
		const state = new PromiseState(a);
		state.toString();
	}).toThrow();
});

test("Test pending promise state", () => {
	const promise = new Promise(() => {});
	const state = new PromiseState(promise);

	expect(promise instanceof Promise).toBe(true);
	expect(state instanceof PromiseState).toBe(true);
	expect(state.isPending()).toBe(true);
	expect(state.toString()).toBe("pending");
});

test("Test rejected promise state", () => {
	const promise = Promise.reject("nothing to see");
	const state = new PromiseState(promise);

	expect(promise instanceof Promise).toBe(true);
	expect(state instanceof PromiseState).toBe(true);
	expect(state.isRejected()).toBe(true);
	expect(state.toString()).toBe("rejected");

	promise.catch((err) => {
		expect(err).toBeTruthy();
	});
});

test("Test resolved promise state", () => {
	const promise = Promise.resolve("finished state");
	const state = new PromiseState(promise);

	expect(promise instanceof Promise).toBe(true);
	expect(state instanceof PromiseState).toBe(true);
	expect(state.isResolved()).toBe(true);
	expect(state.toString()).toBe("resolved");

	promise
		.then((ret) => {
			expect(ret).toBeTruthy();
		})
		.catch((err) => {
			throw new Error(`${t.context.title}: ${err}`);
		});
});

test("Test complete promise state", () => {
	const promise = Promise.resolve("complete state");
	const state = new PromiseState(promise);

	expect(promise instanceof Promise).toBe(true);
	expect(state instanceof PromiseState).toBe(true);
	expect(state.isComplete()).toBe(true);

	promise
		.then((ret) => {
			expect(ret).toBeTruthy();
		})
		.catch((err) => {
			throw new Error(`${t.context.title}: ${err}`);
		});
});

test("Test the promise function types", () => {
	return new Promise(
		(resolve: ResolveFn<string>, reject: RejectFn<string>) => {
			expect(resolve).toBeTruthy();
			expect(reject).toBeTruthy();
			resolve("successful test");
		}
	);
});
