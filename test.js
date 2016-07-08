'use strict';

var should = require('should'),
    fs = require('fs'),
    sub = require('./');

describe('substituter', function () {
    it('should sub at root', function () {
        sub('hello ${region}!', { region: 'world' }).should.equal('hello world!');
    });

    it('should sub at level 1', function () {
        sub('hello ${globe.region}!', { globe: { region: 'world' } }).should.equal('hello world!');
    });

    it('should pass thru when not found', function () {
        sub('hello ${globe.unknown}!', {}).should.equal('hello ${globe.unknown}!');
    });

    it('should pass thru on undefined', function () {
        sub('hello ${globe.unknown}!').should.equal('hello ${globe.unknown}!');
    });

    it('should sub into xml file', function () {
        sub(fs.readFileSync('./test.xml'), { globe: { region: 'world' } }).should.equal('<test><testel1>world</testel1></test>');
    });
});