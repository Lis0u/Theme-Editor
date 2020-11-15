import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Card, Input, Radio } from 'semantic-ui-react';
import store from '../../store';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValue, isThemeValueValid } from '../../helper/themeValueHelper';

const ThemeLine = ({ title, variableName, setEditMode, theme, themeProps }) => {
  const [value, setValue] = useState(themeProps.value);
  const [radioValue, setRadioValue] = useState(themeProps.type);
  const [isInputValid, setIsInputValid] = useState(true);

  const typeToDisplay = themeProps.type === 'em' || themeProps.type === 'px'
    ? ` (${themeProps.type})` : '';
  return (
    <Card className="theme-line-card">
      <Card.Content>
        <Grid>
          <Grid.Row
            className="theme-line-title theme-line-form-row"
            style={{
              color: getTransformedValue(theme['colors.highlight1'], theme),
              fontSize: getTransformedValue(theme['textfield.textSize'], theme) + theme['textfield.textSize'].type
            }}
          >
            <Grid.Column computer={10} data-testid="theme-line-title">
              {`${title}${typeToDisplay}: `}
              <strong style={{ paddingRight: '5px' }}>{getTransformedValue(themeProps, theme)}</strong>
              {handleColorInfoRenderer()}
            </Grid.Column>
            <Grid.Column computer={5} className="variable-name">
              {variableName}
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
                error={!isInputValid}
                value={value}
                min={radioValue === 'em' ? 0.1 : radioValue === 'px' ? 1 : ''}
                type={radioValue === 'text' || radioValue === 'color' ? 'text' : 'number'}
                onChange={(e) => handleInputChange(e.target.value)}
                style={{
                  color: getTransformedValue(theme['textfield.color'], theme)
                }}
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
                style={{
                  color: getTransformedValue(theme['buttons.color'], theme),
                  backgroundColor: getTransformedValue(theme['buttons.background'], theme),
                }}
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
          <rect
            width="15"
            height="15" 
            rx="5"
            ry="5"
            className="color-info-rect"
            style={{ fill: getTransformedValue(themeProps, theme) }}
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
    if (isThemeValueValid(value, radioValue, theme)) {
      nextTheme[variableName].value = value;
      nextTheme[variableName].type = radioValue;
      store.dispatch({ type: 'UPDATE_THEME', theme: nextTheme });
      setEditMode(false);
    } else {
      // error hanlder
      setIsInputValid(false);
    }
  }
};

ThemeLine.propTypes = {
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({
    'buttons.background': PropTypes.shape({ value: PropTypes.string }),
    'buttons.color': PropTypes.shape({ value: PropTypes.string }),
    'colors.highlight1': PropTypes.shape({ value: PropTypes.string }),
    'textfield.color': PropTypes.shape({ value: PropTypes.string }),
    'textfield.textSize': PropTypes.shape({ type: PropTypes.string })
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
    'textfield.color': { value: '#000000', type: 'color' },
    'textfield.textSize': { value: '1.1', type: 'em' },
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
