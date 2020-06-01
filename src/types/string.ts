export { }
import common from './common'

// ==============================================
// MESSAGES
// ==============================================
const messages = {
  ...common.messages,

  base: '@1 must be a string',
  isUpper: '@1 must be in uppercase format',
  isLower: '@1 must be in lowercase format',
  length: '@1 must be @2 characters long',
  min: '@1 length must be atleast @2 characters long',
  max: '@1 length must be less than or equal to @2 characters long'
}

// ==============================================
// RULES
// ==============================================
const errorHOF: errorHOF = (key, label) => common.error(key, label, { source: messages })
const rules: ruleSet = {
  ...common.rules,

  base (value, label, param) {
    return typeof value === 'string' || errorHOF('base', label)
  },

  isUpper (value, label, param) {
    return value.toUpperCase() === value || errorHOF('isUpper', label)
  },

  isLower (value, label, param) {
    return value.toLowerCase() === value || errorHOF('isLower', label)
  },

  length (value, label, param) {
    if (!param) return common.error('missingComparator', 'Length', { developer: true })
    return value.length === param || errorHOF('length', [label, param])
  },

  min (value, label, param) {
    if (!param) return common.error('missingComparator', 'Min', { developer: true })
    return value.length >= param || errorHOF('min', [label, param])
  },

  max (value, label, param) {
    if (!param) return common.error('missingComparator', 'Max', { developer: true })
    return value.length <= param || errorHOF('max', [label, param])
  }
}

const ruleExport = { rules, messages }

export default ruleExport
