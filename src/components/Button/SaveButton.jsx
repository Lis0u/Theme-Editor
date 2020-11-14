import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';

const SaveButton = ({ theme }) => {
  return (
    <Button
      className="save-button"
      style={{ color: theme['buttons.color'].value, backgroundColor: theme['buttons.background'].value }}
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
  }),
};

SaveButton.defaultProps = {
  theme: {
    'buttons.background': { value: '#ffffff', type: 'color' },
    'buttons.color': { value: '#4a86e8', type: 'color' },
  },
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(SaveButton);
