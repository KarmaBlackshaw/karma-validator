"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = require('./index');
var schema = {
    firstName: {
        type: 'string',
        min: 4,
        allow: ['asdf'],
        isUpper: true,
        label: 'First name'
    },
    secondName: {
        type: 'number',
        greater: 4,
        label: 'Second name'
    }
};
var objectValue = {
    firstName: 'asdf',
    secondName: 'false'
};
var errors = validate(schema, objectValue);
console.log(errors);
