# Theme Editor

This project aims to manage the theme colors, sizes, and many other UI properties in a single page application.

## Assumptions

### page overview
- Arriving on the page, there should be a title on the top, four closed accordions, as well as a Save button on the bottom.
- Each UI theme value has a default value, that is shown if the user has not specified one yet.
- The default theme is initialized in the file `/src/helper/themeValues`, where default values and types per props are defined in the `defaultProps` key.
- A UI theme is composed of a title, a value, a type, a variableName, and an equivalent css property.
- Only the value and type of a UI theme can be changed by the user.
- The localStorage is empty, until the Save button is hit; which saves the changed UI theme values & types in the localStorage. If no default values/types are changed, then no values/types will be stored in the localStorage.
- On page load, if the localStorage contains a `theme` value, then the UI theme elements of the page would be initialized from this localStorage data.
- The theme values **DO NOT** alter the page's style. However, this can be easily done by following the section `alter theme from UI theme values` part below.

### colors
Colors are assumed to be in any valid color CSS form, including:
- Hexadecimal with 3, 4 or 6 digits _#000000_
- RGB format _rgb(255, 141, 78)_
- RGBA format _rgba(1, 255, 255, 0.5)_
- CSS color strings like "red", "green", "black", etc. and are not case sensitive.

All properties refering to a color are assumed to be equivalent to the css property `color`.
Thus, to see if a color value is valid, it will be assigned to the css property `color`. If the result is an empty string `''`, it means that the value is not valid. Otherwise, it is.

### em, px
All values of type `px` or `em` must be a number. Values can be either positive, O, or negative, and must be in the range [-33554400, -33554400].

### error handling
Each UI theme presented in the page refers to an equivalent Css property.
If the value given by the user does not comply with the equivalent css property, then the user will not be allowed to save his/herr changes. There are two visual effects to inform the user of his unvalid value=
- the 'OK' button would be disabled
- and an error message would appear just below the input to inform the user if the value non validity.

There are different ways to trigger an error message:
- With the selected type to `text`:
   - A given variable does not exist
   - A given variable causes a loop; meaning that the given variable refers to, in the end, to the UI theme that the user is modifying.
  - A given variable which final value does not comply with the equivalent css property. For example, if the equivalent css property is `color`, even though the variable `{sizes.text}` that refers to `1px` won't comply with the property `color`. Indeed, `color: 1px` is not a valid css assignment.
  - A final value that does not comply with the equivalent css property
  - A value that exceeds 500 characters
- With the selected type `em` or `px`:
  - The value that is not a number
  - A value that does not comply with the equivalent css property. (ex: if the equivalent css property is `color`, any value given with the `px` type won't comply anyway).
  - A value that exceeds 500 characters
  - A value that is not in the range [-33554400, -33554400]
- With the selected type `color`:
  - The value is not a color (valid colors are explained in the ### colors part)
  - The resulting color does not comply to the equivalent css property. (Same case a `px` and `em`, if the equivalent css property is `fontSize`, then a color won't comply anyway).
  - A value that exceeds 500 characters

After 300ms of inactivity, the value validation process is triggered. If the value does not comply, then the error message will show, and the `OK` button gets disabled. Otherwise, the input stays as is, with the user's value.

### text
Properties of type `text` can contain two types of values:
- A final value to be directly used as (ex: `1px`)
- A value containing one or many variables, which refer to other properties values, like `{colors.primay}`.

These variables, for display purpose, will be replaced by the value they are referring to.
For example, if an input contains the following valid text (assuming that the variables exist, and refer to `1` and `#000000` respectively, and that the input is of type `border`):
`{sizes.borderWidth}px solid {colors.primary}` will be changed into `1px solid #000000`;

A text is limited to 500 characters.

### text sizes

All text sizes are assumed to be equivalent to the css property `font-size`.

### alter theme from UI theme values

For the moment, the UI theme values DO NOT alter the page's style, for usability purposes.
However, if you need to make the page's style dynamic with the UI theme values, you'll have to follow these simple steps:
1. Add the inline `style` prop within the element you wish to alter the style of.
```js
<div style={{}}>
```

2. In the `style` prop, add the css property you wish to update
```js
<div style={{ color: }}>
```

3. Then, replace the value by the function `getTransformedValue` with the appropriate parameters.
```js
<div style={{ color: getTransformedValue(themeProps, theme, initialThemeProps) }}>
```
With:
* `themeProps` _(object)_ - An object containing the `value` _(string)_ and the `type` _(string)_ of the value
* `theme` _(object)_ - The theme saved in redux store (so that changes are dynamic !)
* `initialThemeProps` _(object)_ - The initial Theme object from the file `themeValues`.

4. If the type set is `px` or `em`, you'll need to add an additional unity:
```js
const initialType = themeProps && themeProps.type ? themeProps.type : themeLine.defaultType;
const unit = initialType === 'em' || initialType === 'px'
    ? ` ${initialType}` : '';
<div style={{ fontSize: `${getTransformedValue(themeProps, theme, initialThemeProps)}${unit}` }}>
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
