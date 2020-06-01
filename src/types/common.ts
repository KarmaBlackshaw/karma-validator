export { }

// ==============================================
// MESSAGES
// ==============================================
const messages = {
  required: '@1 is required',
  allow: '@1 only allows @2',
  disallow: '@1 does not allow the following values @2'
}

const developerMessage: { [index: string]: string } = {
  // Helper Error Messages
  missingComparator: '@1 needs a value to reference',
  paramArray: '@1 is expected to receive an array',
  paramNumber: '@1 is expected to receive a number'
}

// ==============================================
// METHODS
// ==============================================
/**
 * Output user error message
 * Tip: Wrap in error HOF to follow DRY Priniciple
 */
const error: error = (key, label, options) => {
  const rawMessage = options.developer === true
    ? developerMessage[key]
    : options.source[key]

  if (!rawMessage) {
    return console.log(`${key} not found!`)
  }

  if (!Array.isArray(label)) {
    return rawMessage.replace(/@1/, label)
  }

  return label.reduce((acc, val, key) => {
    // tslint:disable-next-line:no-parameter-reassignment
    const regex = new RegExp(`@${++key}`, 'g')
    return acc.replace(regex, val)
  }, rawMessage)
}

// ==============================================
// RULES
// ==============================================
const errorHOF: errorHOF = (key, label) => common.error(key, label, { source: messages })
const rules: ruleSet = {
  required(value, label, param) {
    return (value && value.toString().trim().length > 0) || errorHOF('required', label)
  },

  allow(value, label, param) {
    if (!Array.isArray(param)) return common.error('paramArray', label, { developer: true })
    return param.some(x => x === value) || errorHOF('allow', [label, param])
  },

  disallow(value, label, param) {
    if (!Array.isArray(param)) return common.error('paramArray', label, { developer: true })
    return !param.some(x => x === value) || errorHOF('disallow', [label, param])
  }
}

module.exports = { error, rules, messages }
