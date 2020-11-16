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
            name.lastIndexOf('}')
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

export function getTransformedValueWithType (themeProps, theme) {
  let finalValue = getTransformedValue(themeProps, theme);
  if (finalValue) {
    finalValue += themeProps.type === 'px' ? 'px' : themeProps.type === 'em' ? 'em' : '';
  }

  return finalValue;
}

export function isThemeValueValid (value, type, theme, equivalentCssProperty) {
  try {
    if (!value) return false;
    let isValueValid = false;

    // Check for types px and em if the value is a number
    if ((type === 'px' || type === 'em') && !isNaN(value)) {
      isValueValid = true;
    }

    if (type === 'color') {
        const s = new Option().style;
        s.color = value;
        return s.color !== '';
    }

    if (type === 'text') {
      const variableRegEx = /{(\w+)\.(\w+)}/g;
      const variableNames = value.match(variableRegEx);
      if (variableNames && variableNames.length > 0) {
        return !doesValueCauseLoopOrContainsUnvalidVariables(value, theme);
      } else {
        // It does not contain any variables
        isValueValid = true;
      }
    }

    // check that value fits the equivalent cssPropperty for any types
    const style = new Option().style;
    const unity = type === 'px' ? 'px' : type === 'em' ? 'em' : '';
    style[equivalentCssProperty] = value + unity;
    isValueValid = style[equivalentCssProperty] !== '';

    return isValueValid;
  } catch (e) {
    return false;
  }
}

function doesValueCauseLoopOrContainsUnvalidVariables (value, theme) {
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
          theme[variableNameWithoutBrackets].value
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
