export { };
import validate from './index';

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
}

const objectValue = {
  firstName: 'asdf',
  secondName: ['cat'],
}

const errors = validate(schema, objectValue)
console.log(errors)
