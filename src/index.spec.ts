import { fetchDefaultArray, fetchDefaultNumber, fetchDefaultString, fetchDefaultValue, getDefault } from './index';

describe('fetchDefaultValue()', () => {
  it('returns the defaultValue if object is falsy', () => {
    // Depending on the project tsconfig with strictNullChecks enabled this will not compile
    const object: { something: undefined } = undefined;
    expect(fetchDefaultValue(object, 'something', 'default')).toEqual('default');
  });

  it('returns the attribute value if it is present', () => {
    const o = {foo: 'bar'};
    expect(fetchDefaultValue(o, 'foo', 'something')).toEqual('bar');
  });

  it('returns the defaultValue if the attribute value is blank', () => {
    const o: {foo: string} = {foo: undefined};
    expect(fetchDefaultValue(o, 'foo', 'bar')).toEqual('bar');
  });

  it('only overrides undefined or null', () => {
    const o = {bool: false, emptyString: '', number: 0};
    expect(fetchDefaultValue(o, 'bool', true)).toBe(false);
    expect(fetchDefaultValue(o, 'emptyString', 'foo')).toEqual('');
    expect(fetchDefaultValue(o, 'number', NaN)).toEqual(0);
  });
});

describe('fetchDefaultArray()', () => {
  it('returns an empty array if the provided list is undefined', () => {
    expect(fetchDefaultArray(undefined)).toEqual([]);
  });

  it('returns the provided list if it is present', () => {
    const list = [1, 2, 3];
    expect(fetchDefaultArray(list)).toEqual(list);
  });

  it('does not filter the list for undefined if applyFilter is false', () => {
    const elem = {foo: 'bar'};
    const list = [undefined, elem];
    expect(fetchDefaultArray(list, false)).toEqual(list);
  });

  it('filter the list by default according to the provided filter function', () => {
    const list = [null, undefined, 1];
    expect(fetchDefaultArray(list, true, Boolean)).toEqual([1]);
  });
});

describe('fetchDefaultString', () => {
  it('returns an empty string if the provided value is undefined', () => {
    const o: {foo: string} = {foo: undefined};
    expect(fetchDefaultString(o, 'foo')).toEqual('');
  });
});

describe('fetchDefaultNumber', () => {
  it('returns as default if the provided value is undefined', () => {
    const o: {num: number} = {num: undefined};
    expect(fetchDefaultNumber(o, 'num')).toEqual(NaN);
  });
});

describe('getDefaultValue', () => {
  it('returns the providedValue if it is not undefined', () => {
    expect(getDefault('foo', 'bar')).toEqual('foo');
    expect(getDefault(0, 1)).toEqual(0);
    expect(getDefault(false, true)).toEqual(false);
  });

  it('preserves explicit null values if preserveNull is true', () => {
    expect(getDefault(null, 1)).toBeNull();
  });

  it('returns the default value if current value is null and preserveNull is false', () => {
    expect(getDefault(null, 1, false)).toEqual(1);
  });
});
