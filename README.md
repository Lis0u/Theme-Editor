# Theme Editor

This project aims to manage the theme colors, sizes, and many other UI properties in a single page application.

## Assumptions

### colors
- Colors are assumed to be in a hexadecimal form (either with 3 (#333) or 6 (#333333) digits).

### em, px
- All properties of type `px` or `em` cannot be 0 nor negative.
  - The smallest possible value for a property of type `em` is `0.1`.
  - The smallest possible value for a property of type `px` is `1`.

### text
- Properties of type `text` can contain other properties values contained between brackets, like `{colors.primay}`.

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
