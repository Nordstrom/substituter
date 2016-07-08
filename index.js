'use strict';

var _ = require('lodash');

module.exports = function (tmpl, data) {
    return tmpl.replace(/\$\{([\w\.\-]+)}/g, function (match, term) {
        return _.get(data, term) || match;
    });
};
