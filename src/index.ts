export { };

import common from './types/common'

import typeString from './types/string';
import typeNumber from './types/number';
import typeBoolean from './types/boolean';
import typeArray from './types/array';

const types: primitiveRequireTypes = {
  string: typeString,
  number: typeNumber,
  boolean: typeBoolean,
  array: typeArray
}

const RULE_SETS: ruleSet = Object.keys(types).reduce((acc, curr) => {
  return { ...acc, [curr]: types[curr].rules }
}, {})

const pushError = (validationMessage: any, array: string[]) => {
  return typeof validationMessage !== 'boolean'
    ? [...array, validationMessage]
    : array
}

// High order function for user error messages
const errorHOF: errorHOF = (key, label) => common.error(key, label, { source: common.messages })

/**
 * Validate object using schema model
 * @param {object} schema - Schema Model
 * @param {object} objectValue - Object to be evaluated
 */
const validate = (schema: object, objectValue: anyObject) => {
  // TODO: MOVE TO ARRAY TYPE
  // TODO: CONVERT TO PROMISE BASED FUNCTION
  // Check matching keys and values
  const schemaKeys = Object.keys(schema)
  const objectValueKeys = Object.keys(objectValue)
  const hasUnknownKeys = objectValueKeys.find(x => !schemaKeys.includes(x))
  if (hasUnknownKeys) {
    return { schema: errorHOF('unknownKey', [hasUnknownKeys]) }
  }

  // Validate keys
  const validation = Object.entries(schema).reduce((errors: stringObject, [property, rulesObject]) => {
    const value = objectValue[property]
    let validationMessage
    errors[property] = []

    const hasType = Object.keys(rulesObject).find(x => x === 'type')
    if (!hasType) {
      throw Error('Validation key: type is missing')
    }

    const { type, ...restOfRulesObject } = rulesObject
    const ruleSet = RULE_SETS[type]

    // Check if property is optional
    // Perform other operations if value is not empty
    if (restOfRulesObject.optional) {
      if (value === undefined || value === '') {
        return errors
      }
    }

    // Check basic type first
    const baseValidationMessage = ruleSet.base(value, rulesObject.label || property, null)
    errors[property] = pushError(baseValidationMessage, errors[property])

    const rulePropertyValidExceptions = ['label']
    Object.entries(restOfRulesObject).forEach(([ruleProperty, ruleValue]) => {

      // Check if rule does not exist in rules sets or in excempted rules
      if (!ruleSet[ruleProperty] && !rulePropertyValidExceptions.includes(ruleProperty)) {
        throw Error(`${ruleProperty} is not a valid rule for type ${type}!`)
      }

      // Check if rule is not in the excempted rules
      if (!rulePropertyValidExceptions.includes(ruleProperty)) {
        const validationFn = ruleSet[ruleProperty]
        const label = rulesObject.label || property

        validationMessage = validationFn(objectValue[property], label, ruleValue)
        errors[property] = pushError(validationMessage, errors[property])
      }
    })

    return errors
  }, {})

  return Object.keys(validation).reduce((acc, curr) => {
    return validation[curr].length ? { ...acc, [curr]: validation[curr] } : acc
  }, {})
}

export default validate
