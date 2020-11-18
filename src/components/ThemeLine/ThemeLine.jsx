import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThemeLineDisplay from './ThemeLineDisplay';
import ThemeLineForm from './ThemeLineForm';
import './style.css';

const ThemeLine = ({ themeProps, title, variableName, themeLine }) => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    isInEditMode
    ? (
      <ThemeLineForm
        title={title}
        themeLine={themeLine}
        themeProps={themeProps}
        variableName={variableName}
        setEditMode={(editMode) => setIsInEditMode(editMode)}
      />
    )
    : (
      <ThemeLineDisplay
        title={title}
        variableName={variableName}
        setEditMode={(editMode) => setIsInEditMode(editMode)}
        themeProps={themeProps}
        defaultThemeProps={themeLine}
      />
    )
  );
};

ThemeLine.propTypes = {
  themeLine: PropTypes.shape({
    title: PropTypes.string,
    variableName: PropTypes.string,
    defaultValue: PropTypes.string,
    defaultType: PropTypes.string,
    equivalentCssProperty: PropTypes.string,
  }),
  themeProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
  }),
  title: PropTypes.string,
  variableName: PropTypes.string,
};

ThemeLine.defaultProps = {
  themeLine: {
    title: 'H1 color',
    defaultValue: '#000000',
    variableName: 'colors.h1',
    equivalentCssProperty: 'color',
    type: 'color',
  },
  themeProps: {
    value: '',
    type: '',
  },
  title: '',
  variableName: '',
};

export default ThemeLine;
