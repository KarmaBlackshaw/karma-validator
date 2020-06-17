export { };
import validate from './index';

const schema = {
  firstName: {
    type: 'string',
    min: 4,
    allow: ['asdf'],
    label: 'First name',
    required: true
  },

  secondName: {
    type: 'array',
    has: 'dog',
    label: 'Second name',
    optional: true
  },

  dog: {
    type: 'string',
    min: 5,
    optional: true,
  }
}

const objectValue = {
  dog: 'sdaf'
}

const errors = validate(schema, objectValue)
console.log(errors)
