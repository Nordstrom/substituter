'use strict';

var should = require('should'),
    sub = require('./');

describe('substituter', function () {
    it('should sub at root', function () {
        sub('hello ${region}!', { region: 'world' }).should.equal('hello world!');
    });

    it('should sub at level 1', function () {
        sub('hello ${globe.region}!', { globe: { region: 'world' } }).should.equal('hello world!');
    });

    it('should pass thru when not found', function() {
        sub('hello ${globe.unknown}!', { }).should.equal('hello ${globe.unknown}!');
    });

    it('should pass thru on undefined', function() {
        sub('hello ${globe.unknown}!').should.equal('hello ${globe.unknown}!');
    });
});