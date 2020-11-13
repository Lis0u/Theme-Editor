import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import './style.css';

const ThemeLineDisplay = ({ title, value, variableName, setEditMode }) => {
  return (
    <Button className="invisible-button" onClick={() => handleClick()}>
      <Grid>
        <Grid.Row>
          <Grid.Column computer={10}>
            {title}: <strong>{value}</strong>
            {handleColorInfoRenderer()}
          </Grid.Column>
          <Grid.Column computer={6} className="variable-name">
            {variableName}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Button>
  );
  
  function handleClick () {
    setEditMode(true);
  }

  function handleColorInfoRenderer () {
    const colorRegex = /#[0-9A-Fa-f]{6}/gi;
    if (value.toString().match(colorRegex)) {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" rx="5" ry="5" className="color-info-rect" style={{ fill: value }} />
        </svg>
      );
    }
    return '';
  }
};

ThemeLineDisplay.propTypes = {
  setEditMode: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variableName: PropTypes.string,
};

ThemeLineDisplay.defaultProps = {
  setEditMode: () => {},
  title: '',
  value: '',
  variableName: '',
};

export default ThemeLineDisplay;
