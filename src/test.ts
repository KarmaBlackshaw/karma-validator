export { };
const validate = require('./index')

const schema = {
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
}

const objectValue = {
  firstName: 'asdf',
  secondName: 'false'
}

const errors = validate(schema, objectValue)
console.log(errors)
