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
var messages = __assign(__assign({}, common.messages), { base: '@1 must be a string', isUpper: '@1 must be in uppercase format', isLower: '@1 must be in lowercase format', length: '@1 must be @2 characters long', min: '@1 length must be atleast @2 characters long', max: '@1 length must be less than or equal to @2 characters long' });
var errorHOF = function (key, label) { return common.error(key, label, { source: messages }); };
var rules = __assign(__assign({}, common.rules), { base: function (value, label, param) {
        return typeof value === 'string' || errorHOF('base', label);
    },
    isUpper: function (value, label, param) {
        return value.toUpperCase() === value || errorHOF('isUpper', label);
    },
    isLower: function (value, label, param) {
        return value.toLowerCase() === value || errorHOF('isLower', label);
    },
    length: function (value, label, param) {
        if (!param)
            return common.error('missingComparator', 'Length', { developer: true });
        return value.length === param || errorHOF('length', [label, param]);
    },
    min: function (value, label, param) {
        if (!param)
            return common.error('missingComparator', 'Min', { developer: true });
        return value.length >= param || errorHOF('min', [label, param]);
    },
    max: function (value, label, param) {
        if (!param)
            return common.error('missingComparator', 'Max', { developer: true });
        return value.length <= param || errorHOF('max', [label, param]);
    } });
module.exports = { rules: rules, messages: messages };
