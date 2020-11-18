import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Card, Input, Radio } from 'semantic-ui-react';
import store from '../../store';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue, isThemeValueValid } from '../../helper/themeValueHelper';
import ErrorLine from './ErrorLine';

const MAX_NUMBER_VALUE = 33554400;
const MAX_CHARACTERS_NUMBER = 500;

const ThemeLine = ({ setEditMode, theme, themeProps, themeLine }) => {
  const initialValue = themeProps && themeProps.value ? themeProps.value : themeLine.defaultValue;
  const [value, setValue] = useState(initialValue);

  const initialType = themeProps && themeProps.type ? themeProps.type : themeLine.defaultType;
  const [radioValue, setRadioValue] = useState(initialType);

  const [isValueValid, setIsValueValid] = useState(true);

  const typeToDisplay = themeProps.type === 'em' || themeProps.type === 'px'
    ? ` (${themeProps.type})` : '';
  return (
    <Card className="theme-line-card">
      <Card.Content>
        <Grid>
          <Grid.Row className="theme-line-title theme-line-form-row">
            <Grid.Column computer={10} data-testid="theme-line-title">
              {`${themeLine.title}${typeToDisplay}: `}
              <strong style={{ paddingRight: '5px' }}>{getTransformedValue(themeProps, theme, themeLine)}</strong>
              {handleColorInfoRenderer()}
            </Grid.Column>
            <Grid.Column computer={5} className="variable-name">
              {themeLine.variableName}
            </Grid.Column>
            <Grid.Column computer={1}>
              <Button
                className="invisible-button"
                data-testid="theme-line-cancel-button"
                onClick={() => handleCancel()}
              >
                x
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="theme-line-form-row">
            <Grid.Column computer={2}>
              Value:
            </Grid.Column>
            <Grid.Column computer={14}>
              <Input
                className="theme-line-value-input"
                data-testid="theme-line-value-input"
                error={!isValueValid}
                value={value}
                min={radioValue === 'em' ? -MAX_NUMBER_VALUE : radioValue === 'px' ? -MAX_NUMBER_VALUE : ''}
                max={radioValue === 'em' ? MAX_NUMBER_VALUE : radioValue === 'px' ? MAX_NUMBER_VALUE : ''}
                maxLength={MAX_CHARACTERS_NUMBER}
                type={radioValue === 'text' || radioValue === 'color' ? 'text' : 'number'}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <ErrorLine
            value={value}
            type={radioValue}
            variableName={themeLine.variableName}
            isValueValid={isValueValid}
            setIsValueValid={setIsValueValid}
            equivalentCssProperty={themeLine.equivalentCssProperty}
          />
          <Grid.Row className="theme-line-form-row">
            <Grid.Column computer={2}>
              Type:
            </Grid.Column>
            <Grid.Column computer={10}>
              <Radio
                className="theme-line-radio-button"
                data-testid="radio-text"
                label="text"
                checked={(radioValue) === 'text'}
                onClick={() => setRadioValue('text')}
              />
              <Radio
                className="theme-line-radio-button"
                data-testid="radio-em"
                label="em"
                checked={(radioValue) === 'em'}
                onClick={() => setRadioValue('em')}
              />
              <Radio
                className="theme-line-radio-button"
                data-testid="radio-px"
                label="px"
                checked={(radioValue) === 'px'}
                onClick={() => setRadioValue('px')}
              />
              <Radio
                className="theme-line-radio-button"
                data-testid="radio-color"
                label="color"
                checked={(radioValue) === 'color'}
                onClick={() => setRadioValue('color')}
              />
            </Grid.Column>
            <Grid.Column computer={4} floated="right" textAlign="right">
              <Button
                className="theme-line-save-button"
                data-testid="theme-line-save-button"
                disabled={!isValueValid}
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
    const style = new Option().style;
    style.color = themeProps.value;
    if (style.color !== '') {
      return (
        <svg width="15" height="15">
          <rect
            width="15"
            height="15" 
            ry="5"
            className="color-info-rect"
            style={{ fill: getTransformedValue(themeProps, theme, themeLine) }}
          />
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
    const result = isThemeValueValid(value, radioValue, theme, themeLine.equivalentCssProperty, themeLine.variableName);
    if (result.isValueValid) {
      if (!nextTheme[themeLine.variableName]) {
        nextTheme[themeLine.variableName] = {};
      }
      nextTheme[themeLine.variableName].value = value;
      nextTheme[themeLine.variableName].type = radioValue;
      store.dispatch({ type: 'UPDATE_THEME', theme: nextTheme });
      setEditMode(false);
    }
  }
};

ThemeLine.propTypes = {
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({}),
  themeLine: PropTypes.shape({
    title: PropTypes.string,
    variableName: PropTypes.string,
    defaultValue: PropTypes.string,
    defaultType: PropTypes.string,
    equivalentCssProperty: PropTypes.string,
  }),
  title: PropTypes.string,
  themeProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
  }),
};

ThemeLine.defaultProps = {
  setEditMode: () => {},
  theme: {},
  themeLine: {
    title: 'H1 color',
    defaultValue: '#000000',
    defaultType: 'color',
    variableName: 'colors.highlight1',
    equivalentCssProperty: 'color'
  },
  themeProps: {
    value: '',
    type: '',
  },
  title: '',
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ThemeLine);
