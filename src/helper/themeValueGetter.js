export function getTransformedValue (themeProps, theme) {
  if (!themeProps) return '';
  let finalValue = themeProps.value;
  if (themeProps.type === 'text') {
    const variableRegEx = /{(\w+)\.(\w+)}/g;

    // If the extracted value is alos a variable, then the extract process should go again
    while (finalValue && finalValue.match(variableRegEx)) {
      const variableNames = finalValue.match(variableRegEx);
      if (variableNames && variableNames.length > 0) {
        variableNames.forEach((name) => {
          const variableNameWithoutBrackets = name.substring(
            name.lastIndexOf('{') + 1,
            name.lastIndexOf('}')
          );
  
          finalValue = finalValue.replace(
            name,
            theme[variableNameWithoutBrackets].value
          );
        });
      }
    }
  }

  return finalValue;
}
