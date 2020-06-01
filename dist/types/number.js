"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./common"));
const messages = Object.assign(Object.assign({}, common_1.default.messages), { base: '@1 must be a number', greater: '@1 must be greater than @2', lesser: '@1 must be lesser than @2', max: '@1 must be less than or equal to @2', min: '@1 must be greater than or equal to @2' });
const errorHOF = (key, label) => common_1.default.error(key, label, { source: messages });
const rules = Object.assign(Object.assign({}, common_1.default.rules), { base(value, label, param) {
        return (typeof value === 'number' || !isNaN(value) || !isNaN(+value)) || errorHOF('base', label);
    },
    greater(value, label, param) {
        if (typeof param !== 'number')
            return common_1.default.error('paramNumber', label, { developer: true });
        return value > param || errorHOF('greater', [label, param]);
    },
    lesser(value, label, param) {
        if (typeof param !== 'number')
            return common_1.default.error('paramNumber', label, { developer: true });
        return value < param || errorHOF('greater', [label, param]);
    },
    max(value, label, param) {
        if (typeof param !== 'number')
            return common_1.default.error('paramNumber', label, { developer: true });
        return value <= param || errorHOF('max', [label, param]);
    },
    min(value, label, param) {
        if (typeof param !== 'number')
            return common_1.default.error('paramNumber', label, { developer: true });
        return value >= param || errorHOF('min', [label, param]);
    } });
const ruleExport = { rules, messages };
exports.default = ruleExport;
