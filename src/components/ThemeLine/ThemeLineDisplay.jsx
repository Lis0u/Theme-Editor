import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue } from '../../helper/themeValueGetter';

const ThemeLineDisplay = ({ title, themeProps, variableName, setEditMode, theme }) => {
  const transformedValue = getTransformedValue(themeProps, theme);
  const [isLineHovered, setIsLineHovered] = useState(false);

  const typeToDisplay = themeProps.type === 'em' || themeProps.type === 'px'
    ? ` (${themeProps.type})` : '';
  return (
    <Button
      className="invisible-button"
      data-testid="theme-line-button"
      onClick={() => handleClick()}
      style={{
        color: isLineHovered
          ? getTransformedValue(theme['colors.highlight1'], theme)
          : getTransformedValue(theme['colors.primary'], theme),
        fontSize: getTransformedValue(theme['sizes.text'], theme) + theme['sizes.text'].type
      }}
      onMouseEnter={() => setIsLineHovered(true)}
      onMouseLeave={() => setIsLineHovered(false)}
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
    const colorRegex = /#[0-9A-Fa-f]{6}/gi;
    if (transformedValue && transformedValue.toString().match(colorRegex)) {
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
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({
    'colors.secondary': PropTypes.shape({ value: PropTypes.string }),
    'colors.highlight1': PropTypes.shape({ value: PropTypes.string }),
    'sizes.text': PropTypes.shape({ type: PropTypes.string }),
    'colors.primary': PropTypes.shape({ value: PropTypes.string }),
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
    'colors.secondary': { value: '#ffffff' },
    'colors.highlight1': { value: '#4a86e8' },
    'sizes.text': { type: 'text' },
    'colors.primary': { value: '#000000' },
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
