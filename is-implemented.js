'use strict';

var d = require('d')

  , create = Object.create, setPrototypeOf = Object.setPrototypeOf;

module.exports = function () {
	var weakMap, SubWeakMap, x;
	if (typeof WeakMap !== 'function') return false;
	if (String(WeakMap.prototype) !== '[object WeakMap]') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.clear !== 'function') return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	// Extendable
	if (setPrototypeOf) {
		SubWeakMap = function () { WeakMap.apply(this, arguments); };
		setPrototypeOf(SubWeakMap, WeakMap);
		SubWeakMap.prototype = create(WeakMap.prototype, { constructor: d(SubWeakMap) });
		try { weakMap = new SubWeakMap([[x, 'foo']]); } catch (e) { return false; }
		try {
			if (weakMap.get(x) !== 'foo') return false;
		} catch (e) { return false; }
	}
	return true;
};
