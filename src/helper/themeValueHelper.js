export function getTransformedValue (themeProps, theme) {
  if (!themeProps) return '';
  let finalValue = themeProps.value;
  if (themeProps.type === 'text') {
    const variableRegEx = /{(\w+)\.(\w+)}/g;

    // If the extracted value is also a variable, then the extract process should go again
    // unless variables call another, leading to infinite loop ! 
    const visitedVariables = [];
    while (finalValue && finalValue.match(variableRegEx)) {
      const variableNames = finalValue.match(variableRegEx);
      if (variableNames && variableNames.length > 0) {
        for (let i = 0; i < variableNames.length; i++) {
          const name = variableNames[i];
          const variableNameWithoutBrackets = name.substring(
            name.lastIndexOf('{') + 1,
            name.lastIndexOf('}'),
          );

          if (visitedVariables.includes(variableNameWithoutBrackets)) {
            break;
          } else {
            finalValue = finalValue.replace(
              name,
              theme[variableNameWithoutBrackets].value
            );
          }
          visitedVariables.push(variableNameWithoutBrackets);
        }
      } else {
        break;
      }
    }
  }

  return finalValue;
}

export function isThemeValueValid (value, type, theme, equivalentCssProperty, variableName) {
  const errors = [];
  let isValueValid = false;
  if (!value) {
    errors.push('The value cannot be empty.');
    return { isValueValid: false, errors };
  }

  // Check for types px and em if the value is a number
  if ((type === 'px' || type === 'em') && !isNaN(value)) {
    isValueValid = true;
  }

  if (type === 'color') {
      const s = new Option().style;
      s.color = value;
      if (s.color === '') {
        errors.push(`"${value}" is not a valid color value.`);
      }
      return { isValueValid: s.color !== '', errors };
  }

  if (type === 'text') {
    const variableRegEx = /{(\w+)\.(\w+)}/g;
    const variableNames = value.match(variableRegEx);
    if (variableNames && variableNames.length > 0) {
      const doesValueLoopOrUnvalid = doesValueCauseLoopOrContainsUnvalidVariables(value, theme, variableName);
      if (doesValueLoopOrUnvalid) {
        errors.push('Your value causes a loop, or does not exist.');
      }
      return { isValueValid: !doesValueLoopOrUnvalid, errors};
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
    errors.push(`"${value}" is not a valid ${equivalentCssProperty} value`);
  }
  isValueValid = style[equivalentCssProperty] !== '';

  return { isValueValid, errors };
}

function doesValueCauseLoopOrContainsUnvalidVariables (value, theme, variableName) {
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
      // store value that contain variable(s)
      results.push(finalValue);
      for (let i = 0; i < variableNames.length; i++) {
        const name = variableNames[i];
        const variableNameWithoutBrackets = name.substring(
          name.lastIndexOf('{') + 1,
          name.lastIndexOf('}')
        );

        if (typeof theme[variableNameWithoutBrackets] !== 'object') {
          // Not a valid variable; it does not exist !
          return true;
        }
  
        finalValue = finalValue.replace(
          name,
          variableNameWithoutBrackets === variableName ? value : theme[variableNameWithoutBrackets].value
        );
      }
    } else {
      // value does not contain a variable, meaning that there is no loop
      break;
    }
  }
  // check if final value is either a text value or contains variables
  return results.includes(finalValue);
}
