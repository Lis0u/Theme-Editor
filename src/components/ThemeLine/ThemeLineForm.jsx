import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Card, Input, Radio } from 'semantic-ui-react';
import store from '../../store';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue } from '../../helper/themeValueGetter';

const ThemeLine = ({ title, variableName, setEditMode, theme, themeProps }) => {
  const [value, setValue] = useState(null);
  const [radioValue, setRadioValue] = useState('');

  return (
    <Card className="theme-line-card">
      <Card.Content>
        <Grid>
          <Grid.Row
            className="theme-line-title theme-line-form-row"
            style={{
              color: getTransformedValue(theme['colors.highlight1'], theme)
            }}
          >
            <Grid.Column computer={10}>
              {title}: <strong>{getTransformedValue(themeProps, theme)}</strong>
              {handleColorInfoRenderer()}
            </Grid.Column>
            <Grid.Column computer={5} className="variable-name">
              {variableName}
            </Grid.Column>
            <Grid.Column computer={1}>
              <Button className="invisible-button" onClick={() => handleCancel()}>x</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="theme-line-form-row">
            <Grid.Column computer={2}>
              Value:
            </Grid.Column>
            <Grid.Column computer={14}>
              <Input
                className="theme-line-value-input"
                value={value || themeProps.value}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="theme-line-form-row">
            <Grid.Column computer={2}>
              Type:
            </Grid.Column>
            <Grid.Column computer={10}>
              <Radio
                className="theme-line-radio-button"
                label="text"
                checked={(radioValue || themeProps.type) === 'text'}
                onChange={() => setRadioValue('text')}
              />
              <Radio
                className="theme-line-radio-button"
                label="em"
                checked={(radioValue || themeProps.type) === 'em'}
                onChange={() => setRadioValue('em')}
              />
              <Radio
                className="theme-line-radio-button"
                label="px"
                checked={(radioValue || themeProps.type) === 'px'}
                onChange={() => setRadioValue('px')}
              />
              <Radio
                className="theme-line-radio-button"
                label="color"
                checked={(radioValue || themeProps.type) === 'color'}
                onChange={() => setRadioValue('color')}
              />
            </Grid.Column>
            <Grid.Column computer={4} floated="right" textAlign="right">
              <Button
                className="theme-line-save-button" 
                style={{ color: theme['buttons.color'].value, backgroundColor: theme['buttons.background'].value }}
                onClick={() => handleSave()}
              >
                OK
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );

  function handleColorInfoRenderer () {
    const colorRegex = /#[0-9A-Fa-f]{6}/gi;
    if (themeProps.value.toString().match(colorRegex)) {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" rx="5" ry="5" className="color-info-rect" style={{ fill: themeProps.value }} />
        </svg>
      );
    }
    return '';
  }

  function handleCancel () {
    setEditMode(false);
  }

  function handleInputChange (nextInputValue) {
    setValue(nextInputValue);
  }

  function handleSave () {
    const nextTheme = { ...theme };
    nextTheme[variableName].value = value;
    nextTheme[variableName].type = radioValue || themeProps.type;
    store.dispatch({ type: 'UPDATE_THEME', theme: nextTheme });
    setEditMode(false);
  }
};

ThemeLine.propTypes = {
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({
    'buttons.background': PropTypes.shape({
      value: PropTypes.string,
    }),
    'buttons.color': PropTypes.shape({
      value: PropTypes.string,
    }),
    'colors.highlight1': PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  themeProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
  }),
  variableName: PropTypes.string,
};

ThemeLine.defaultProps = {
  setEditMode: () => {},
  theme: {
    'buttons.background': { value: '#ffffff', type: 'color' },
    'buttons.color': { value: '#4a86e8', type: 'color' },
    'colors.highlight1': { value: '#4a86e8', type: 'color' },
  },
  themeProps: {
    value: '',
    type: 'text',
  },
  title: '',
  variableName: '',
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ThemeLine);
