
type anyObject = { [index: string]: any }
type stringObject = { [index: string]: string }
type functionObject = { [index: string]: (key: string, label: any) => any }
type errorHOF = (key: string, label: any) => any
type primitiveRequireTypes = { [key: string]: anyObject }

type errorOptions = {
  source?: anyObject,
  developer?: boolean
}

type rule = (
  value: any,
  label: string,
  param?: any
) => any

type error = (
  key: string,
  label: string,
  options: errorOptions
) => any


interface ruleSet {
  [key: string]: rule
}

interface ruleExport {
  rules: functionObject,
  messages: stringObject,
}

interface ruleExportCommon {
  rules: functionObject,
  messages: stringObject,
  error: error
}