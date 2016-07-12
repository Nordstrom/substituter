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

    it('should handle undefined tmpl gracefully', function () {
        should.equal(sub(undefined, undefined), undefined);
    });

    it('should handle null tmpl gracefully', function () {
        should.equal(sub(null, undefined), null);
    });

    it('should handle undefined replacements gracefully', function () {
        should.equal(sub('blah', undefined), 'blah');
    });

    it('should sub into object at level 1', function () {
        sub({ name: '${param}' }, { param: 'param-value' }).should.eql({ name: 'param-value' });
    });

    it('should sub into object at level 3', function () {
        sub({ obj1: { obj2: { name: '${params1.params2.param}' } } }, { params1: { params2: { param: 'param-value' } } })
            .should.eql({ obj1: { obj2: { name: 'param-value' } } });
    });
});