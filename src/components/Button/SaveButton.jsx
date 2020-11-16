import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.css';

const SaveButton = ({ theme }) => {
  return (
    <Button
      className="save-button"
      data-testid="save-button"
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
  theme: PropTypes.shape({}),
};

SaveButton.defaultProps = {
  theme: {},
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(SaveButton);
