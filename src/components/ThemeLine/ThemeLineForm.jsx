import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Card, Input, Radio } from 'semantic-ui-react';
import store from '../../store';
import { connect } from 'react-redux';
import './style.css';

const ThemeLine = ({ initialValue, title, variableName, setEditMode, theme }) => {
  const [value, setValue] = useState('');
  const [radioValue, setRadioValue] = useState('text');

  return (
    <Card className="theme-line-card">
      <Card.Content>
        <Grid>
          <Grid.Row className="theme-line-title theme-line-form-row">
            <Grid.Column computer={10}>
              {title}: <strong>{initialValue}</strong>
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
                value={value || initialValue}
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
                checked={radioValue === 'text'}
                onChange={() => setRadioValue('text')}
              />
              <Radio
                className="theme-line-radio-button"
                label="em"
                checked={radioValue === 'em'}
                onChange={() => setRadioValue('em')}
              />
              <Radio
                className="theme-line-radio-button"
                label="px"
                checked={radioValue === 'px'}
                onChange={() => setRadioValue('px')}
              />
              <Radio
                className="theme-line-radio-button"
                label="color"
                checked={radioValue === 'color'}
                onChange={() => setRadioValue('color')}
              />
            </Grid.Column>
            <Grid.Column computer={4} floated="right" textAlign="right">
              <Button className="theme-line-save-button" onClick={() => handleSave()}>
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
    if (initialValue.toString().match(colorRegex)) {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" rx="5" ry="5" className="color-info-rect" style={{ fill: initialValue }} />
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
    nextTheme[variableName] = value;
    store.dispatch({ type: 'UPDATE_THEME', theme: nextTheme });
    setEditMode(false);
  }
};

ThemeLine.propTypes = {
  initialValue: PropTypes.string,
  setEditMode: PropTypes.func,
  theme: PropTypes.shape({}),
  title: PropTypes.string,
  variableName: PropTypes.string,
};

ThemeLine.defaultProps = {
  initialValue: '',
  setEditMode: () => {},
  theme: {},
  title: '',
  variableName: '',
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ThemeLine);
