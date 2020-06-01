import common from './common'

// ==============================================
// MESSAGES
// ==============================================
const messages = {
  ...common.messages,

  base: '@1 must be a number',
  greater: '@1 must be greater than @2',
  lesser: '@1 must be lesser than @2',
  max: '@1 must be less than or equal to @2',
  min: '@1 must be greater than or equal to @2'
}

// ==============================================
// RULES
// ==============================================
const errorHOF: errorHOF = (key, label) => common.error(key, label, { source: messages })
const rules: ruleSet = {
  ...common.rules,

  base (value, label, param) {
    return (typeof value === 'number' || !isNaN(value) || !isNaN(+value)) || errorHOF('base', label)
  },

  greater (value, label, param) {
    if (typeof param !== 'number') return common.error('paramNumber', label, { developer: true })
    return value > param || errorHOF('greater', [label, param])
  },

  lesser (value, label, param) {
    if (typeof param !== 'number') return common.error('paramNumber', label, { developer: true })
    return value < param || errorHOF('greater', [label, param])
  },

  max (value, label, param) {
    if (typeof param !== 'number') return common.error('paramNumber', label, { developer: true })
    return value <= param || errorHOF('max', [label, param])
  },

  min (value, label, param) {
    if (typeof param !== 'number') return common.error('paramNumber', label, { developer: true })
    return value >= param || errorHOF('min', [label, param])
  }
}

const ruleExport = { rules, messages }

export default ruleExport