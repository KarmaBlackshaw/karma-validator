"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common = require('./common');
var messages = {
    base: '@1 must be a boolean',
    truthy: '@1 must be true',
    falsy: '@1 must be false'
};
var invalid = ['allow', 'disallow'];
var validCommonRules = Object.keys(common.rules)
    .filter(function (x) { return !invalid.includes(x); })
    .reduce(function (acc, curr) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[curr] = common.rules[curr], _a)));
}, {});
var errorHOF = function (key, label) { return common.error(key, label, { source: messages }); };
var rules = __assign(__assign({}, validCommonRules), { base: function (value, label, param) {
        return typeof value === 'boolean' ||
            ['true', 'false'].includes(value.toLowerCase()) ||
            errorHOF('base', label);
    },
    truthy: function (value, label, param) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        return value === 'true' || value === true || errorHOF('truthy', label);
    },
    falsy: function (value, label, param) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        return value === 'false' || value === false || errorHOF('falsy', label);
    } });
var ruleExport = { rules: rules, messages: messages };
module.exports = ruleExport;
