"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const messages = {
    base: '@1 must be an array',
    has: '@1 expects @2 to be present in the array.'
};
const invalid = ['allow', 'disallow'];
const validCommonRules = Object.keys(common_1.default.rules)
    .filter(x => !invalid.includes(x))
    .reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: common_1.default.rules[curr] })), {});
const errorHOF = (key, label) => common_1.default.error(key, label, { source: messages });
const rules = Object.assign(Object.assign({}, validCommonRules), { base(value, label, param) {
        return Array.isArray(value) || errorHOF('base', label);
    },
    has(value, label, param) {
        if (param === undefined || typeof param === 'undefined') {
            return common_1.default.error('paramUndefined', label, { developer: true });
        }
        return value.includes(param) || errorHOF('has', [label, param]);
    } });
const ruleExport = { rules, messages };
exports.default = ruleExport;
