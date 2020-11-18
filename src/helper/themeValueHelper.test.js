import { getInitialThemeValue, getTransformedValue, isThemeValueValid } from "./themeValueHelper";

describe('Tests on getTransformedValue function', () => {
  it('should return directly on empty values', () => {
    const value = getTransformedValue({}, {});
    expect(value).toBeFalsy();
  });

  it('should return the value given in parameter without changes', () => {
    const value = getTransformedValue({ value: '#000000', type: 'color' }, {});
    expect(value).toBe('#000000');
  });

  it('should return a value from the theme in storage', () => {
    const theme = { 'colors.primary': { value: '#000000', type: 'color' } };
    const value = getTransformedValue({ value: "{colors.primary}", type: 'text'}, theme);
    expect(value).toBe('#000000');
  });

  it('should return the value from the parent value of the direct value from theme', () => {
    const theme = {
      'colors.primary': { value: '#000000', type: 'color' },
      'colors.primaryBackground': { value: '#ffffff', type: 'color' },
      'colors.secondary': { value: '{colors.primary}', type: 'text' },
    };
    const value = getTransformedValue({ value: '{colors.secondary}', type: 'text' }, theme);
    expect(value).toBe('#000000');
  });
});

describe('Tests on isThemeValueValid function', () => {
  it('should return false on empty value', () => {
    const result = isThemeValueValid('', '', {}, '');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on value a string when number is required on type em', () => {
    const result = isThemeValueValid('abcd', 'em', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return true when value is number for type em', () => {
    const result = isThemeValueValid(1.2, 'em', {}, 'fontSize');
    expect(result.isValueValid).toBe(true);
  });

  it('should return false when value is empty is number for type em', () => {
    const result = isThemeValueValid('', 'em', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on value a string when number is required on type px', () => {
    const result = isThemeValueValid('abcd', 'px', {},'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return true when value is number for type px', () => {
    const result = isThemeValueValid(1, 'px', {}, 'fontSize');
    expect(result.isValueValid).toBe(true);
  });

  it('should return false on a string value that is not a color with type color', () => {
    const result = isThemeValueValid('abcd', 'color', {}, 'color');
    expect(result.isValueValid).toBe(false);
  });

  it('should return true on hex value of type color', () => {
    const result = isThemeValueValid('#000000', 'color', {}, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return true on hex value of type color', () => {
    const result = isThemeValueValid('#333', 'color', {}, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return true on rgb value of type color', () => {
    const result = isThemeValueValid('rgb(0, 0, 0)', 'color', {}, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return true on color value of type color', () => {
    const result = isThemeValueValid('red', 'color', {}, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return true on existing var in theme on a value of type text', () => {
    const theme = { 'sizes.text': { value: 1.1, type: 'em' }};
    const result = isThemeValueValid('{sizes.text}', 'text', theme, 'fontSize');
    expect(result.isValueValid).toBe(true);
  })

  it('should return false on non existing var in theme in value of type text', () => {
    const result = isThemeValueValid('{ab.cd}', 'text', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return true on an existing var in other var in value of type text', () => {
    const theme = {
      'colors.highlight1': { value: '#90FE54', type: 'color' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
    };
    const result = isThemeValueValid('{colors.highlight2}', 'text', theme, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return true on an existing var in other var in value of type text', () => {
    const theme = {
      'colors.highlight1': { value: '#90FE54', type: 'color' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const result = isThemeValueValid('{colors.highlight3}', 'text', theme, 'color');
    expect(result.isValueValid).toBe(true);
  });

  it('should return false with value containing var causes a loop', () => {
    const theme = {
      'colors.highlight1': { value: '{colors.highlight3}', type: 'text' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const result = isThemeValueValid('{colors.highlight2}', 'text', theme, 'color');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false with value containing finalValue that is ref to other value causes a loop', () => {
    const theme = {
      'colors.highlight1': { value: '{colors.highlight3}', type: 'text' },
      'colors.highlight2': { value: '#ffffff', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const result = isThemeValueValid('{colors.highlight1}', 'text', theme, 'color', 'colors.highlight2');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on any random text that does not contain a variable', () => {
    const result = isThemeValueValid('randooom', 'text', {}, 'color');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on a too big number for type px', () => {
    const result = isThemeValueValid('10000000000000', 'px', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on too small number value for px', () => {
    const result = isThemeValueValid('-10000000000000', 'px', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on a too big number for type em', () => {
    const result = isThemeValueValid('10000000000000', 'em', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });

  it('should return false on too small number value for em', () => {
    const result = isThemeValueValid('-10000000000000', 'em', {}, 'fontSize');
    expect(result.isValueValid).toBe(false);
  });
});

describe('Tests on getIntialValue function', () => {
  it('should return empty value from non existing inital values', () => {
    const result = getInitialThemeValue('colors.secondary');
    expect(result).toBe('#ffffff');
  });
});