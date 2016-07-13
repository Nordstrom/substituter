# substituter
Simple substitution for Node.js  [![Build Status](https://drone.io/github.com/Nordstrom/substituter/status.png)](https://drone.io/github.com/Nordstrom/substituter/latest)

## Installation
Install via npm as follows:
```
$ npm install substituter --save
```

## Usage
Substitute any object property into a template string.
```javascript
var sub = require('substituter'),
    fs = require('fs');

var results = sub('Hello ${globe.region}!', { globe: { region: 'world' } });
// Hello world!

results = sub(fs.readFileSync('template.xml'), { val1: 'foo' });
// Does substitution in a Buffer.  results is a string.
```

Substitute any object property into another object.
```javascript
var sub = require('substituter');

var results = sub({ board: { message: 'Hello ${globe.region}!' }}, { globe: { region: 'world' } });
// { board: { message: 'Hello ${globe.region}!' } }
```
