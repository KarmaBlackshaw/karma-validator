"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const messages = Object.assign(Object.assign({}, common_1.default.messages), { base: '@1 must be a string', isUpper: '@1 must be in uppercase format', isLower: '@1 must be in lowercase format', length: '@1 must be @2 characters long', min: '@1 length must be atleast @2 characters long', max: '@1 length must be less than or equal to @2 characters long' });
const errorHOF = (key, label) => common_1.default.error(key, label, { source: messages });
const rules = Object.assign(Object.assign({}, common_1.default.rules), { base(value, label, param) {
        return typeof value === 'string' || errorHOF('base', label);
    },
    isUpper(value, label, param) {
        return value.toUpperCase() === value || errorHOF('isUpper', label);
    },
    isLower(value, label, param) {
        return value.toLowerCase() === value || errorHOF('isLower', label);
    },
    length(value, label, param) {
        if (!param)
            return common_1.default.error('missingComparator', 'Length', { developer: true });
        return value.length === param || errorHOF('length', [label, param]);
    },
    min(value, label, param) {
        if (!param)
            return common_1.default.error('missingComparator', 'Min', { developer: true });
        return value.length >= param || errorHOF('min', [label, param]);
    },
    max(value, label, param) {
        if (!param)
            return common_1.default.error('missingComparator', 'Max', { developer: true });
        return value.length <= param || errorHOF('max', [label, param]);
    } });
const ruleExport = { rules, messages };
exports.default = ruleExport;
