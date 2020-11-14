export function getTransformedValue (themeProps, theme) {
  let finalValue = themeProps.value;
    if (themeProps.type === 'text') {
      const variableRegEx = /{(\w+)\.(\w+)}/g;
      const variableNames = finalValue.match(variableRegEx);
      if (variableNames && variableNames.length > 0) {
        variableNames.forEach((name) => {
          const variableNameWithoutBrackets = name.substring(
            name.lastIndexOf('{') + 1,
            name.lastIndexOf('}')
          );

          finalValue = finalValue.replace(
            `${name}`,
            theme[variableNameWithoutBrackets].value
          );

          console.log('finalValue', finalValue)
        });
      }
    }
    return finalValue;
}
