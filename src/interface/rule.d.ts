interface ruleSet {
  [key: string]: (
    value: any,
    label: string,
    param?: string | number | string[] | number[]) => any
}

type anyObject = { [index: string]: string }

type primitiveRequireTypes = {
  [key: string]: anyObject,
}

type errorOptions = {
  source: anyObject,
  developer: boolean
}

type error = (
  key: string,
  label: string,
  options: errorOptions
) => any

type errorHOF = (key: string, label: any) => any

