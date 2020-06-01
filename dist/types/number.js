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
var common = require('./common');
var messages = __assign(__assign({}, common.messages), { base: '@1 must be a number', greater: '@1 must be greater than @2', lesser: '@1 must be lesser than @2', max: '@1 must be less than or equal to @2', min: '@1 must be greater than or equal to @2' });
var errorHOF = function (key, label) { return common.error(key, label, { source: messages }); };
var rules = __assign(__assign({}, common.rules), { base: function (value, label, param) {
        return (typeof value === 'number' || !isNaN(value) || !isNaN(+value)) || errorHOF('base', label);
    },
    greater: function (value, label, param) {
        if (typeof param !== 'number')
            return common.error('paramNumber', label, { developer: true });
        return value > param || errorHOF('greater', [label, param]);
    },
    lesser: function (value, label, param) {
        if (typeof param !== 'number')
            return common.error('paramNumber', label, { developer: true });
        return value < param || errorHOF('greater', [label, param]);
    },
    max: function (value, label, param) {
        if (typeof param !== 'number')
            return common.error('paramNumber', label, { developer: true });
        return value <= param || errorHOF('max', [label, param]);
    },
    min: function (value, label, param) {
        if (typeof param !== 'number')
            return common.error('paramNumber', label, { developer: true });
        return value >= param || errorHOF('min', [label, param]);
    } });
module.exports = { rules: rules, messages: messages };
