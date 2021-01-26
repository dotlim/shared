import { hasOwn, isArray, isString, isArguments, isSet, isMap, isObject } from './index'


export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (isArray(value) || isString(value) || isArguments(value)) {
    return value.length === 0;
  }

  if (isSet(value) || isMap(value)) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Reflect.ownKeys(value).length === 0;
  }

  for (let key in value) {
    if (hasOwn(value, key)) {
      return false;
    }
  }

  return true;
}