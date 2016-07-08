'use strict';

var _ = require('lodash');

module.exports = function (tmpl, data) {
    var s = _.isBuffer(tmpl) ? tmpl.toString() : tmpl;
    return s.replace(/\$\{([\w\.\-]+)}/g, function (match, term) {
        return _.get(data, term) || match;
    });
};
