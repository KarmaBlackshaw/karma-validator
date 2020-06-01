"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const schema = {
    firstName: {
        type: 'string',
        min: 4,
        allow: ['asdf'],
        label: 'First name'
    },
    secondName: {
        type: 'array',
        has: 'dog',
        label: 'Second name'
    },
    dog: {
        type: 'string',
        min: 5,
        optional: true,
    }
};
const objectValue = {
    firstName: 'asdf',
    secondName: ['cat'],
};
const errors = index_1.default(schema, objectValue);
console.log(errors);
