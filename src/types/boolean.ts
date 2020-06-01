export { }
const common = require('./common')

// ==============================================
// MESSAGES
// ==============================================
const messages = {
  base: '@1 must be a boolean',
  truthy: '@1 must be true',
  falsy: '@1 must be false'
}

// Handle edge cases for common rules which do not apply to boolean validation
const invalid = ['allow', 'disallow']
const validCommonRules = Object.keys(common.rules)
  .filter(x => !invalid.includes(x))
  .reduce((acc, curr) => ({ ...acc, [curr]: common.rules[curr] }), {})

// ==============================================
// RULES
// ==============================================
const errorHOF: errorHOF = (key, label) => common.error(key, label, { source: messages })
const rules: ruleSet = {
  ...validCommonRules,

  base(value, label, param) {
    return typeof value === 'boolean' ||
      ['true', 'false'].includes(value.toLowerCase()) ||
      errorHOF('base', label)
  },

  truthy(value, label, param) {
    if (typeof value === 'string') {
      value = value.toLowerCase()
    }

    return value === 'true' || value === true || errorHOF('truthy', label)
  },

  falsy(value, label, param) {
    if (typeof value === 'string') {
      value = value.toLowerCase()
    }

    return value === 'false' || value === false || errorHOF('falsy', label)
  }
}

const ruleExport = { rules, messages }

module.exports = ruleExport
