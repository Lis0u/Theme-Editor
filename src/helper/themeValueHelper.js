import { themeValues } from './themeValues';

export function getTransformedValue (themeProps, theme, initialThemeProps) {
  let value = '';
  if (!themeProps || !themeProps.value) {
    if (!initialThemeProps) return '';
    else {
      value = initialThemeProps.defaultValue;
    }
  } else {
    value = themeProps.value;
  }

  if (themeProps.type === 'text' && value) {
    const variableRegEx = /{(\w+)\.(\w+)}/g;
    const variableName = value.match(variableRegEx);
    value = getFinalValueFromVariable(value, theme, variableName);
  }

  return value;
}

export function isThemeValueValid (value, type, theme, equivalentCssProperty, variableName) {
  const errors = [];
  let isValueValid = false;
  if (!value) {
    errors.push('The value cannot be empty.');
    return { isValueValid: false, errors };
  }

  // Check for value's length
  if (value.length > 500) {
    errors.push('The value is too long, please remove characters so taht you value has below 500 characters.');
    return  { isValueValid: false, errors };
  }

  // Check for types px and em if the value is a number
  if ((type === 'px' || type === 'em') && !isNaN(value)) {
    if (value > 33554400 || value < -33554400) {
      errors.push('Your value does not respect the range [-33554400; 33554400]. Please update your number.');
      return { isValueValid: false, errors }
    }
    isValueValid = true;
  }

  if (type === 'color') {
      const s = new Option().style;
      s.color = value;
      if (s.color === '') {
        errors.push(`Your value is not a valid color value.`);
      }
      return { isValueValid: s.color !== '', errors };
  }

  if (type === 'text') {
    const variableRegEx = /{(\w+)\.(\w+)}/g;
    const variableNames = value.match(variableRegEx);
    if (variableNames && variableNames.length > 0) {
      const finalValue = getFinalValueFromVariable(value, theme, variableName);
      if (!finalValue) {
        errors.push('Your value causes a loop, or does not exist.');
      }
      return { isValueValid: Boolean(finalValue), errors};
    } else {
      // It does not contain any variables
      isValueValid = true;
    }
  }

  // check that value fits the equivalent cssPropperty for any types
  const style = new Option().style;
  const unity = type === 'px' ? 'px' : type === 'em' ? 'em' : '';
  style[equivalentCssProperty] = value + unity;
  if (style[equivalentCssProperty] === '') {
    errors.push(`Your value is not a valid ${equivalentCssProperty} value`);
  }
  isValueValid = style[equivalentCssProperty] !== '';

  return { isValueValid, errors };
}

function getFinalValueFromVariable (value, theme, variableName) {
  // Array to store all values containing variables
  const results = [];

  const variableRegEx = /{(\w+)\.(\w+)}/g;
  let variableNames = [];
  let finalValue = value;
  // check if finalValue has already been seen in the results array
  // If it exists in the array, it means that there's a loop between variables.
  while (!results.includes(finalValue)) {
    variableNames = finalValue.match(variableRegEx);
    if (variableNames && variableNames.length > 0) {
      // store value that contains variable(s)
      results.push(finalValue);

      for (let i = 0; i < variableNames.length; i++) {
        const name = variableNames[i];
        const variableNameWithoutBrackets = name.substring(
          name.lastIndexOf('{') + 1,
          name.lastIndexOf('}')
        );

        let valueToReplace = '';

        if (!theme[variableNameWithoutBrackets] || !theme[variableNameWithoutBrackets].value) {
          // Look in themeValues
          if (!themeValues) {
            return '';
          }
          valueToReplace = getInitialThemeValue(variableNameWithoutBrackets);
        } else {
          valueToReplace = theme[variableNameWithoutBrackets].value
        }
  
        finalValue = finalValue.replace(
          name,
          variableNameWithoutBrackets === variableName ? value : valueToReplace
        );
      }
    } else {
      // value does not contain a variable, meaning that there is no loop
      break;
    }
  }
  // check if final value is either a text value or contains variables
  if (results.includes(finalValue)) {
    return '';
  }
  return finalValue;
}

export function getInitialThemeValue (variableName) {
  const initialTheme = themeValues
    .find((themeValue) => themeValue.themeProps
      .find(props => props.variableName === variableName));
  if (!initialTheme) {
    // variable name does not exist!
    return '';
  }

  const initialThemeValue = initialTheme.themeProps
    .find(props => props.variableName === variableName);
  if (!initialThemeValue) {
    // variable name does not exist!
    return '';
  }

  return initialThemeValue.defaultValue;
}
