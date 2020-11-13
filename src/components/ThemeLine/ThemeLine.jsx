import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ThemeLineDisplay from './ThemeLineDisplay';
import ThemeLineForm from './ThemeLineForm';
import './style.css';

const ThemeLine = ({ title, value, variableName }) => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  return (
    isInEditMode
    ? (
      <ThemeLineForm
        title={title}
        initialValue={value}
        variableName={variableName}
        setEditMode={(editMode) => setIsInEditMode(editMode)}
      />
    )
    : (
      <ThemeLineDisplay
        title={title}
        value={value}
        variableName={variableName}
        setEditMode={(editMode) => setIsInEditMode(editMode)}
      />
    )
  );
};

ThemeLine.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variableName: PropTypes.string,
};

ThemeLine.defaultProps = {
  title: '',
  value: '',
  variableName: '',
};

export default ThemeLine;
