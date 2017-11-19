import { expect } from 'chai';
import Controller from './app.controller';

describe('app Controller', () => {
	let controller;

	beforeEach(() => {
		controller = new Controller();
	});

	it('should be constructed', () => {
		expect(controller).not.to.be.undefined;
	});

	it('should store app name property', () => {
		expect(controller).not.to.be.undefined;
	});
});
