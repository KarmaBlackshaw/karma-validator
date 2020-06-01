"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    required: '@1 is required',
    allow: '@1 only allows @2',
    disallow: '@1 does not allow the following values @2'
};
const developerMessage = {
    missingComparator: '@1 needs a value to reference',
    paramArray: '@1 is expected to receive an array',
    paramNumber: '@1 is expected to receive a number',
    paramUndefined: '@1 is expects a value to be defined',
};
const error = (key, label, options) => {
    const rawMessage = options.developer === true
        ? developerMessage[key]
        : options.source[key] || '';
    if (!rawMessage) {
        return console.log(`${key} not found!`);
    }
    if (!Array.isArray(label)) {
        return rawMessage.replace(/@1/, label);
    }
    return label.reduce((acc, val, labelKey) => {
        const regex = new RegExp(`@${++labelKey}`, 'g');
        return acc.replace(regex, val);
    }, rawMessage);
};
const errorHOF = (key, label) => error(key, label, { source: messages });
const rules = {
    required(value, label, param) {
        return (value && value.toString().trim().length > 0) || errorHOF('required', label);
    },
    allow(value, label, param) {
        if (!Array.isArray(param)) {
            return error('paramArray', label, { developer: true });
        }
        return param.some((x) => x === value) || errorHOF('allow', [label, param]);
    },
    disallow(value, label, param) {
        if (!Array.isArray(param)) {
            return error('paramArray', label, { developer: true });
        }
        return !param.some((x) => x === value) || errorHOF('disallow', [label, param]);
    },
    optional(value, label, param) {
        return true;
    }
};
const ruleExport = { error, rules, messages };
exports.default = ruleExport;
