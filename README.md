# es6-weak-map
## WeakMap collection as specified in ECMAScript6

_Roughly inspired by Mark Miller's and Kris Kowal's [WeakMap implementation](https://github.com/drses/weak-map)_.

Differences are:
- Assumes compliant ES5 environment (no weird ES3 workarounds or hacks)
- Well modularized CJS style
- Based on one solution.

### Limitations

- Will fail on non extensible objects provided as keys
- While `clear` method is provided, it's not perfectly spec compliant. If some objects were saved as _values_, they need to be removed via `delete`. Otherwise they'll remain infinitely attached to _key_ object (that means, they'll be free for GC only if _key_ object was collected as well).

### Usage

If you want to make sure your environment implements `WeakMap`, do:

```javascript
require('es6-weak-map/implement');
```

If you'd like to use native version when it exists and fallback to polyfill if it doesn't, but without implementing `WeakMap` on global scope, do:

```javascript
var WeakMap = require('es6-weak-map');
```

If you strictly want to use polyfill even if native `WeakMap` exists, do:

```javascript
var WeakMap = require('es6-weak-map/polyfill');
```

#### API

Best is to refer to [specification](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-weakmap-objects). Still if you want quick look, follow example:

```javascript
var WeakMap = require('es6-weak-map');

var map = new WeakMap();
var obj = {};

map.set(obj, 'foo'); // map
map.get(obj);        // 'foo'
map.has(obj);        // true
map.delete(obj);     // true
map.get(obj);        // undefined
map.has(obj);        // false
map.set(obj, 'bar'); // map
map.clear();         // undefined
map.has(obj);        // false
```

### Installation
#### npm

In your project path:

	$ npm install es6-weak-map

##### Browser

You can easily bundle _es6-weak-map_ for browser with [modules-webmake](https://github.com/medikoo/modules-webmake)

## Tests [![Build Status](https://travis-ci.org/medikoo/es6-weak-map.png)](https://travis-ci.org/medikoo/es6-weak-map)

	$ npm test
