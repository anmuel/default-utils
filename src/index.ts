/**
 * Obtain a default value by looking at an object and an attribute of it.
 * If the attribute's value is present, it is returned.
 * Otherwise the provided defaultValue gets returned.
 *
 * @param object
 * @param attribute
 * @param defaultValue
 * @param preserveNull same as getDefault
 *
 * @see getDefault
 */
export function fetchDefaultValue<T extends object>(object: T | undefined | null, attribute: keyof T, defaultValue: any, preserveNull = true): any {
  if (object && object.hasOwnProperty(attribute)) {
    return getDefault(object[attribute], defaultValue, preserveNull);
  } else {
    return defaultValue;
  }
}

/**
 * Convenience method for number argument types
 * It calls fetchDevalueValue with `NaN` as defaultValue.
 * Use fetchDefaultValue directly if an other default, such as `0` is reasonable.
 *
 * @param object
 * @param attribute
 * @param preserveNull
 *
 * @see fetchDefaultValue
 */
export function fetchDefaultNumber<T extends object>(object: T | undefined | null, attribute: keyof T, preserveNull = true): number {
  return fetchDefaultValue(object, attribute, NaN, preserveNull);
}

/**
 * Convenience method for string argument types
 * It calls fetchDevalueValue with an empty string as defaultValue.
 *
 * @param object
 * @param attribute
 * @param preserveNull
 *
 * @see fetchDefaultValue
 */
export function fetchDefaultString<T extends object>(object: T | undefined | null, attribute: keyof T, preserveNull = true): string {
  return fetchDefaultValue(object, attribute, '', preserveNull);
}

/**
 * Ensure to always have an array at hand
 * @param list the array to look at. If it is present, i.e. an Array itself, it is returned.
 * @param applyFilter if set to true (default), a filter function will be applied to the provided array.
 * @param filterFn The filter function to be applied if the `applyFilter` argument is true.
 * By default it omits undefined values in the list.
 */
export function fetchDefaultArray<T>(list: T[] | undefined | null,
                                     applyFilter = true,
                                     filterFn: ((item: T) => boolean) = (item) => item !== undefined): T[] {
  if (list) {
    if (applyFilter) {
      return list.filter(filterFn);
    } else {
      return list;
    }
  } else {
    return new Array<T>();
  }
}

/**
 * The core function of the library. Return a default value if the provided current is not present,
 * i.e. undefined (or null).
 *
 * @param current the current value. If it is present it is returned.
 * @param defaultValue the value to return if the current value is not present.
 * @param preserveNull if set to true a `null` value will be kept if the current value has null.
 * Otherwise the default value is returned.
 */
export function getDefault<T>(current: T | undefined | null, defaultValue: T, preserveNull = true): T {
  if (current !== undefined) {
    if (preserveNull) {
      return current;
    } else if (current === null) {
      return defaultValue;
    }
  }

  return defaultValue;
}
