'use strict';

var _ = require('lodash');

module.exports = function (tmpl, data) {
    function substitute(p) {
        var r = p.replace(/\$\{([\w\.\-]+)}/g, function (match, term) {
            return _.get(data, term) || match;
        });

        if (_.startsWith(r, '/') && _.endsWith(r, '/')) {
            return new RegExp(_.trim(r, '/'));
        }

        return r;
    }

    function transform(obj) {
        return _.mapValues(obj, function (p) {
            if (_.isPlainObject(p)) {
                return transform(p);
            }
            if (_.isString(p)) {
                return substitute(p);
            }
            if (_.isArray(p)) {
                for (var i = 0; i < p.length; i++) {
                    if (_.isString(p[i])) {
                        p[i] = substitute(p[i]);
                    }
                }
            }
            return p;
        });
    }

    if (!tmpl) return tmpl;
    if (_.isBuffer(tmpl)) return substitute(tmpl.toString());
    if (_.isPlainObject(tmpl)) return transform(tmpl);
    if (_.isString(tmpl)) return substitute(tmpl);

    return tmpl;
};
