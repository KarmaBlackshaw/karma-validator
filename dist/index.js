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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types = {
    string: require('./types/string'),
    number: require('./types/number'),
    boolean: require('./types/boolean')
};
var RULE_SETS = Object.keys(types).reduce(function (acc, curr) {
    acc[curr] = types[curr].rules;
    return acc;
}, {});
var pushError = function (validationMessage, array) {
    return typeof validationMessage !== 'boolean'
        ? __spreadArrays(array, [validationMessage]) : array;
};
var validate = function (schema, objectValue) {
    var schemaKeys = Object.keys(schema);
    var objectValueKeys = Object.keys(objectValue);
    var hasUnknownKeys = objectValueKeys.find(function (x) { return !schemaKeys.includes(x); });
    if (hasUnknownKeys) {
        return {
            schema: "Unknown key '" + hasUnknownKeys + "' detected"
        };
    }
    var validation = Object.entries(schema).reduce(function (errors, _a) {
        var property = _a[0], rulesObject = _a[1];
        var value = objectValue[property];
        var validationMessage;
        errors[property] = [];
        var hasType = Object.keys(rulesObject).find(function (x) { return x === 'type'; });
        if (!hasType) {
            throw Error('Validation key: type is missing');
        }
        var type = rulesObject.type, restOfRulesObject = __rest(rulesObject, ["type"]);
        var baseValidationMessage = RULE_SETS[type].base(value, rulesObject.label || property, null);
        errors[property] = pushError(baseValidationMessage, errors[property]);
        var rulePropertyValidExceptions = ['label'];
        Object.entries(restOfRulesObject).forEach(function (_a) {
            var ruleProperty = _a[0], ruleValue = _a[1];
            var ruleSet = RULE_SETS[type];
            if (!ruleSet[ruleProperty] && !rulePropertyValidExceptions.includes(ruleProperty)) {
                throw Error(ruleProperty + " is not a valid rule for type " + type + "!");
            }
            if (!rulePropertyValidExceptions.includes(ruleProperty)) {
                var validationFn = ruleSet[ruleProperty];
                var label = rulesObject.label || property;
                validationMessage = validationFn(objectValue[property], label, ruleValue);
                errors[property] = pushError(validationMessage, errors[property]);
            }
        });
        return errors;
    }, {});
    return Object.keys(validation).reduce(function (acc, curr) {
        var _a;
        return validation[curr].length ? __assign(__assign({}, acc), (_a = {}, _a[curr] = validation[curr], _a)) : acc;
    }, {});
};
module.exports = validate;
