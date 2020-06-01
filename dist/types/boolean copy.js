"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const messages = {
    base: '@1 must be a boolean',
    truthy: '@1 must be true',
    falsy: '@1 must be false'
};
const invalid = ['allow', 'disallow'];
const validCommonRules = Object.keys(common_1.default.rules)
    .filter(x => !invalid.includes(x))
    .reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: common_1.default.rules[curr] })), {});
const errorHOF = (key, label) => common_1.default.error(key, label, { source: messages });
const rules = Object.assign(Object.assign({}, validCommonRules), { base(value, label, param) {
        return typeof value === 'boolean' ||
            ['true', 'false'].includes(value.toLowerCase()) ||
            errorHOF('base', label);
    },
    truthy(value, label, param) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        return value === 'true' || value === true || errorHOF('truthy', label);
    },
    falsy(value, label, param) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        return value === 'false' || value === false || errorHOF('falsy', label);
    } });
const ruleExport = { rules, messages };
exports.default = ruleExport;
