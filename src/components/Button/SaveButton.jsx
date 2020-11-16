import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';
import { getTransformedValueWithType } from '../../helper/themeValueHelper';

const SaveButton = ({ theme }) => {
  return (
    <Button
      className="save-button"
      data-testid="save-button"
      style={{
        color: getTransformedValueWithType(theme['buttons.color'], theme),
        backgroundColor: getTransformedValueWithType(theme['buttons.background'], theme),
        fontSize: getTransformedValueWithType(theme['buttons.fontSize'], theme),
      }}
      onClick={() => handleClick()}
    >
      Save
    </Button>
  );

  function handleClick () {
    // Save theme values from redux store into localstorage
    localStorage.setItem("theme", JSON.stringify(theme));
  }
};

SaveButton.propTypes = {
  theme: PropTypes.shape({
    'buttons.background': PropTypes.shape({
      value: PropTypes.string,
    }),
    'buttons.color': PropTypes.shape({
      value: PropTypes.string,
    }),
    'buttons.fontSize': PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};

SaveButton.defaultProps = {
  theme: {
    'buttons.background': { value: '#ffffff', type: 'color' },
    'buttons.color': { value: '#4a86e8', type: 'color' },
    'buttons.fontSize': { value: 'calc(1.1*1.2)', type: 'text' },
  },
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(SaveButton);
