# Theme Editor

This project aims to manage the theme colors, sizes, and many other UI properties in a single page application.

## Assumptions

### page overview
- Arriving on the page, there should be a title on the top, four closed accordions, as well as a Save button on the bottom.
- The default theme is as follows:
// Detail default theme
- localStorage is empty, until the Save button is hit.

### colors
- Colors are assumed to be in any valid color CSS form, including:
  - Hexadecimal with 6 digits #000000
  - Hexadecimal with 3 digits #333
  - RGB format rgb(255, 141, 78)
  - RGBA format rgba(1, 255, 255, 0.5)
  - CSS color string like "red", "green", "black", etc.

All properties refering to a color are assumed to be equivalent to the css property `color`.
Thus, to see if a color value is valid, it will assigned to the css property `color`. If the result is an empty string `''`, it means that the value is not valid. Otherwise, it is.

### em, px
- All properties of type `px` or `em` cannot be 0 nor negative.
  - The smallest possible value for a property of type `em` is `0.1`.
  - The smallest possible value for a property of type `px` is `0.1`.

### text
- Properties of type `text` can contain other properties values contained between brackets, like `{colors.primay}`.

### text sizes

All text sizes are assumed to be equivalent to the css property `font-size`.

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
