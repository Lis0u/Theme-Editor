import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue } from '../../helper/themeValueHelper';

const ThemeLineDisplay = ({ title, themeProps, variableName, setEditMode, theme, defaultThemeProps }) => {
  const transformedValue = getTransformedValue(themeProps, theme, defaultThemeProps);

  const initialType = themeProps && themeProps.type ? themeProps.type : defaultThemeProps.defaultType;
  const typeToDisplay = initialType === 'em' || initialType === 'px'
    ? ` (${initialType})` : '';
  return (
    <Button
      className="invisible-button"
      data-testid="theme-line-button"
      onClick={() => handleClick()}
    >
      <Grid>
        <Grid.Row className="theme-line-display-row">
          <Grid.Column computer={10}>
            {title}{typeToDisplay}:
            <strong style={{ paddingRight: '5px' }}>{` ${transformedValue}`}</strong>
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
    const style = new Option().style;
    style.color = transformedValue;
    if (style.color !== '') {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" ry="5" className="color-info-rect" style={{ fill: transformedValue }} />
        </svg>
      );
    }
    return '';
  }
};

ThemeLineDisplay.propTypes = {
  defaultThemeProps: PropTypes.shape({
    defaultType: PropTypes.string,
  }),
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  themeProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    transformedValue: PropTypes.string,
    type: PropTypes.string,
  }),
  variableName: PropTypes.string,
};

ThemeLineDisplay.defaultProps = {
  defaultThemeProps: { defaultType: '' },
  setEditMode: () => {},
  theme: {},
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
