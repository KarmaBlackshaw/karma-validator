"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages = {
    required: '@1 is required',
    allow: '@1 only allows @2',
    disallow: '@1 does not allow the following values @2'
};
var developerMessage = {
    missingComparator: '@1 needs a value to reference',
    paramArray: '@1 is expected to receive an array',
    paramNumber: '@1 is expected to receive a number'
};
var error = function (key, label, options) {
    var rawMessage = options.developer === true
        ? developerMessage[key]
        : options.source[key];
    if (!rawMessage) {
        return console.log(key + " not found!");
    }
    if (!Array.isArray(label)) {
        return rawMessage.replace(/@1/, label);
    }
    return label.reduce(function (acc, val, key) {
        var regex = new RegExp("@" + ++key, 'g');
        return acc.replace(regex, val);
    }, rawMessage);
};
var errorHOF = function (key, label) { return common.error(key, label, { source: messages }); };
var rules = {
    required: function (value, label, param) {
        return (value && value.toString().trim().length > 0) || errorHOF('required', label);
    },
    allow: function (value, label, param) {
        if (!Array.isArray(param))
            return common.error('paramArray', label, { developer: true });
        return param.some(function (x) { return x === value; }) || errorHOF('allow', [label, param]);
    },
    disallow: function (value, label, param) {
        if (!Array.isArray(param))
            return common.error('paramArray', label, { developer: true });
        return !param.some(function (x) { return x === value; }) || errorHOF('disallow', [label, param]);
    }
};
module.exports = { error: error, rules: rules, messages: messages };
