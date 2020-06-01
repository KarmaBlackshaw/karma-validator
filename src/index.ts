export { };

const types: primitiveRequireTypes = {
  string: require('./types/string'),
  number: require('./types/number'),
  boolean: require('./types/boolean')
}

const RULE_SETS = Object.keys(types).reduce((acc: anyObject, curr: string) => {
  acc[curr] = types[curr].rules
  return acc
}, {})

const pushError = (validationMessage: any, array: string[]) => {
  return typeof validationMessage !== 'boolean'
    ? [...array, validationMessage]
    : array
}

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
    return {
      schema: `Unknown key '${hasUnknownKeys}' detected`
    }
  }

  // Validate keys
  const validation = Object.entries(schema).reduce((errors, [property, rulesObject]) => {
    const value = objectValue[property]
    let validationMessage
    errors[property] = []

    const hasType = Object.keys(rulesObject).find(x => x === 'type')
    if (!hasType) {
      throw Error('Validation key: type is missing')
    }

    // Check basic type first
    const { type, ...restOfRulesObject } = rulesObject
    const baseValidationMessage = RULE_SETS[type].base(value, rulesObject.label || property, null)
    errors[property] = pushError(baseValidationMessage, errors[property])

    const rulePropertyValidExceptions = ['label']
    Object.entries(restOfRulesObject).forEach(([ruleProperty, ruleValue]) => {
      const ruleSet = RULE_SETS[type]

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

module.exports = validate
