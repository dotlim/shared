import { isObject } from './index';

// 5 types of recursion
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 5 types created by constructor
const boolTag = '[object Boolean]';
const stringTag = '[object String]';
const numberTag = '[object Number]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';

// 3 types of special
const symbolTag = '[object Symbol]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTags = [mapTag, setTag, arrayTag, objectTag, argsTag];

function getType(value: unknown): string {
  return Object.prototype.toString.call(value);
}

function getInit(target: any) {
  const Ctor = target.constructor;
  return new Ctor(target);
}

function cloneRegExp(target: any) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneSymbol(target: Symbol) {
  return Symbol(target.description);
}

function cloneFunction(target: Function) {}

function cloneOtherType(target: any, type: string) {
  const Ctor = target.constructor;

  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target.valueOf());
    case regexpTag:
      return cloneRegExp(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

export function cloneDeep(target: any, map = new WeakMap()): any {
  if (!isObject(target)) return target;

  const type = getType(target);
  let cloneTarget: any;

  if (deepTags.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  /**
   * Symbol 作为属性名，该属性不会出现在for...in、for...of循环中
   * 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
   */

  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  if (type === setTag) {
    target.forEach((value: any) => {
      cloneTarget.add(cloneDeep(value, map));
    });
    return cloneTarget;
  }

  if (type === mapTag) {
    target.forEach((value: any, key: any) => {
      cloneTarget.set(key, cloneDeep(value, map));
    });
    return cloneTarget;
  }

  // 可以使用 Reflect.ownKeys 兼容 Symbol 类型键值
  for (let key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneTarget[key] = cloneDeep(target[key], map);
    }
  }

  return cloneTarget;
}
