export * from './looseEqual';
export * from './cloneDeep';
export * from './isEmpty';

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => hasOwnProperty.call(val, key);

// DataType determination
const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string => objectToString.call(value);
export const toRawType = (value: unknown): string => toTypeString(value).slice(8, -1);

export const isArray = Array.isArray;
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isNumber = (val: unknown): val is number => typeof val === 'number';
export const isString = (val: unknown): val is string => typeof val === 'string';
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';
export const isSymbol = (val: unknown): val is Symbol => typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object';
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]';
export const isArguments = (val: unknown): boolean => toTypeString(val) === '[object Argumets]';

// no operator
export const noop = () => {};
// Always return false
export const no = () => false;

export const extend = Object.assign;

export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};

const camelizeRE = /-(\w)/g;
export const camelize = (str: string) => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str: string) => str.replace(hyphenateRE, '-$1').toLowerCase();

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toNumber = (val: any): any => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
