import { getTransformedValue, isThemeValueValid } from "./themeValueHelper";

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

  // it('should not tolerate a loop', () => {
  //   const theme = {
  //     'colors.primary': { value: '{colors.secondary}', type: 'text' },
  //     'colors.primaryBackground': { value: '#ffffff', type: 'color' },
  //     'colors.secondary': { value: '{colors.primary}', type: 'text' },
  //   };
  //   const value = getTransformedValue({ value: '{colors.secondary}', type: 'text' }, theme);
  //   expect(value).toBe('');
  // });
});

describe('Tests on isThemeValueValid function', () => {
  it('should return false on empty value', () => {
    const isValueValid = isThemeValueValid('', '', {});
    expect(isValueValid).toBe(false);
  });

  it('should return false on value a string when number is required on type em', () => {
    const isValueValid = isThemeValueValid('abcd', 'em', {});
    expect(isValueValid).toBe(false);
  });

  it('should return true when value is number for type em', () => {
    const isValueValid = isThemeValueValid(1.2, 'em', {});
    expect(isValueValid).toBe(true);
  });

  it('should return false when value is empty is number for type em', () => {
    const isValueValid = isThemeValueValid('', 'em', {});
    expect(isValueValid).toBe(false);
  });

  it('should return false on value a string when number is required on type px', () => {
    const isValueValid = isThemeValueValid('abcd', 'px', {});
    expect(isValueValid).toBe(false);
  });

  it('should return true when value is number for type px', () => {
    const isValueValid = isThemeValueValid(1, 'px', {});
    expect(isValueValid).toBe(true);
  });

  it('should return false on a string value that is not a color with type color', () => {
    const isValueValid = isThemeValueValid('abcd', 'color', {});
    expect(isValueValid).toBe(false);
  });

  it('should return true on hex value of type color', () => {
    const isValueValid = isThemeValueValid('#000000', 'color', {});
    expect(isValueValid).toBe(true);
  });

  it('should return true on hex value of type color', () => {
    const isValueValid = isThemeValueValid('#333', 'color', {});
    expect(isValueValid).toBe(true);
  });

  it('should return true on rgb value of type color', () => {
    const isValueValid = isThemeValueValid('rgb(0, 0, 0)', 'color', {});
    expect(isValueValid).toBe(true);
  });

  it('should return true on color value of type color', () => {
    const isValueValid = isThemeValueValid('red', 'color', {});
    expect(isValueValid).toBe(true);
  });

  it('should return true on existing var in theme on a value of type text', () => {
    const isValueValid = isThemeValueValid('{sizes.text}', 'text', { 'sizes.text': { value: 1.1, type: 'em' }});
    expect(isValueValid).toBe(true);
  })

  it('should return false on non existing var in theme in value of type text', () => {
    const isValueValid = isThemeValueValid('{ab.cd}', 'text', {});
    expect(isValueValid).toBe(false);
  });

  it('should return true on an existing var in other var in value of type text', () => {
    const theme = {
      'colors.highlight1': { value: '#90FE54', type: 'color' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const isValueValid = isThemeValueValid('{colors.highlight2}', 'text', theme);
    expect(isValueValid).toBe(true);
  });

  it('should return true on an existing var in other var in value of type text', () => {
    const theme = {
      'colors.highlight1': { value: '#90FE54', type: 'color' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const isValueValid = isThemeValueValid('{colors.highlight3}', 'text', theme);
    expect(isValueValid).toBe(true);
  });

  it('should return false is value causes a loop', () => {
    const theme = {
      'colors.highlight1': { value: '{colors.highlight3}', type: 'text' },
      'colors.highlight2': { value: '{colors.highlight1}', type: 'text' },
      'colors.highlight3': { value: '{colors.highlight2}', type: 'text' },
    };
    const isValueValid = isThemeValueValid('{colors.highlight2}', 'text', theme);
    expect(isValueValid).toBe(false);
  });

  it('should return true on any random text that does not contain a variable', () => {
    const isValueValid = isThemeValueValid('randooom', 'text', {});
    expect(isValueValid).toBe(true);
  });
});