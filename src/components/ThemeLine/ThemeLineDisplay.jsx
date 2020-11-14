import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue } from '../../helper/themeValueGetter';

const ThemeLineDisplay = ({ title, themeProps, variableName, setEditMode, theme }) => {
  return (
    <Button className="invisible-button" onClick={() => handleClick()}>
      <Grid>
        <Grid.Row className="theme-line-display-row">
          <Grid.Column computer={10}>
            {title}: <strong>{getTransformedValue(themeProps, theme)}</strong>
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
    if (themeProps.value && themeProps.value.toString().match(colorRegex)) {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" rx="5" ry="5" className="color-info-rect" style={{ fill: themeProps.value }} />
        </svg>
      );
    }
    return '';
  }
};

ThemeLineDisplay.propTypes = {
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({
    'colors.secondary': PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  themeProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    transformedValue: PropTypes.string,
    type: PropTypes.string,
  }),
  variableName: PropTypes.string,
};

ThemeLineDisplay.defaultProps = {
  setEditMode: () => {},
  theme: {
    'colors.secondary': '#ffffff',
  },
  title: '',
  themeProps: {
    value: '',
    type: 'text',
  },
  variableName: '',
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ThemeLineDisplay);
