export { }
import common from './common'

// ==============================================
// MESSAGES
// ==============================================
const messages = {
  base: '@1 must be an array',
  has: '@1 expects @2 to be present in the array.'
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

  base (value, label, param) {
    return Array.isArray(value) || errorHOF('base', label)
  },


  has (value, label, param) {
    if (param === undefined || typeof param === 'undefined') {
      return common.error('paramUndefined', label, { developer: true })
    }

    return value.includes(param) || errorHOF('has', [label, param])
  }
}

const ruleExport: ruleExport = { rules, messages }

export default ruleExport
