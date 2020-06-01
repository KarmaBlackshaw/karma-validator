"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = __importDefault(require("./types/string"));
const number_1 = __importDefault(require("./types/number"));
const boolean_1 = __importDefault(require("./types/boolean"));
const array_1 = __importDefault(require("./types/array"));
const types = {
    string: string_1.default,
    number: number_1.default,
    boolean: boolean_1.default,
    array: array_1.default
};
const RULE_SETS = Object.keys(types).reduce((acc, curr) => {
    return Object.assign(Object.assign({}, acc), { [curr]: types[curr].rules });
}, {});
const pushError = (validationMessage, array) => {
    return typeof validationMessage !== 'boolean'
        ? [...array, validationMessage]
        : array;
};
const validate = (schema, objectValue) => {
    const schemaKeys = Object.keys(schema);
    const objectValueKeys = Object.keys(objectValue);
    const hasUnknownKeys = objectValueKeys.find(x => !schemaKeys.includes(x));
    if (hasUnknownKeys) {
        return {
            schema: `Unknown key '${hasUnknownKeys}' detected`
        };
    }
    const validation = Object.entries(schema).reduce((errors, [property, rulesObject]) => {
        const value = objectValue[property];
        let validationMessage;
        errors[property] = [];
        const hasType = Object.keys(rulesObject).find(x => x === 'type');
        if (!hasType) {
            throw Error('Validation key: type is missing');
        }
        const { type } = rulesObject, restOfRulesObject = __rest(rulesObject, ["type"]);
        const ruleSet = RULE_SETS[type];
        if (restOfRulesObject.optional) {
            if (value === undefined || value === '') {
                return errors;
            }
        }
        const baseValidationMessage = ruleSet.base(value, rulesObject.label || property, null);
        errors[property] = pushError(baseValidationMessage, errors[property]);
        const rulePropertyValidExceptions = ['label'];
        Object.entries(restOfRulesObject).forEach(([ruleProperty, ruleValue]) => {
            if (!ruleSet[ruleProperty] && !rulePropertyValidExceptions.includes(ruleProperty)) {
                throw Error(`${ruleProperty} is not a valid rule for type ${type}!`);
            }
            if (!rulePropertyValidExceptions.includes(ruleProperty)) {
                const validationFn = ruleSet[ruleProperty];
                const label = rulesObject.label || property;
                validationMessage = validationFn(objectValue[property], label, ruleValue);
                errors[property] = pushError(validationMessage, errors[property]);
            }
        });
        return errors;
    }, {});
    return Object.keys(validation).reduce((acc, curr) => {
        return validation[curr].length ? Object.assign(Object.assign({}, acc), { [curr]: validation[curr] }) : acc;
    }, {});
};
exports.default = validate;
