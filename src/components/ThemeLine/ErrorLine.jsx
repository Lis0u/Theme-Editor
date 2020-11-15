import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTransformedValue, isThemeValueValid } from '../../helper/themeValueHelper';

const INACTIVE_USER_TIME_THRESHOLD = 300; // 300ms

const ErrorLine = ({ value, type, theme, isValueValid, setIsValueValid }) => {
  let [userActivityTimeout, setUserActivityTimeout] = useState(null);

  useEffect(() => {
    resetUserActivityTimeout();
  }, [value, type]);

  function resetUserActivityTimeout () {
    clearTimeout(userActivityTimeout);
    setUserActivityTimeout(null);
    userActivityTimeout = setTimeout(() => {
      inactiveUserAction();
    }, INACTIVE_USER_TIME_THRESHOLD);
  }

  function inactiveUserAction () {
    const result = isThemeValueValid(value, type, theme);
    setIsValueValid(result);
  }

  return (
    isValueValid
      ? ''
      : (
        <Grid.Row
          className="error-line"
          style={{
            fontSize: getTransformedValue(theme['sizes.text'], theme) + theme['sizes.text'].type,
          }}
        >
          <Grid.Column computer={2} />
          <Grid.Column computer={14}>
            <Icon name="warning sign" />
            <p>The value {value} of type {type} is not valid!</p>
          </Grid.Column>
        </Grid.Row>
      )
  );
};

ErrorLine.propTypes = {
  isValueValid: PropTypes.bool,
  setIsValueValid: PropTypes.func,
  theme: PropTypes.shape({
    'sizes.text': PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
    }),
  }),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ErrorLine.defaultProps = {
  isValueValid: true,
  setIsValueValid: () => {},
  theme: {
    'sizes.text': { value: 1, type: 'em' },
  },
  type: 'text',
  value: '',
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ErrorLine);
