import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isThemeValueValid } from '../../helper/themeValueHelper';

const INACTIVE_USER_TIME_THRESHOLD = 300; // 300ms

const ErrorLine = ({ value, type, theme, isValueValid, setIsValueValid, equivalentCssProperty, variableName }) => {
  let [userActivityTimeout, setUserActivityTimeout] = useState(null);
  const [errors, setErrors] = useState(['The value is not valid!']);

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
    const result = isThemeValueValid(value, type, theme, equivalentCssProperty, variableName);
    setIsValueValid(result.isValueValid);
    setErrors(result.errors);
  }

  return (
    isValueValid
      ? ''
      : (
        <Grid.Row className="error-line">
          <Grid.Column computer={2} />
          <Grid.Column computer={14}>
            <div style={{ display: 'inline-flex'}}>
              <Icon name="warning sign" />
              <p data-testid="error-shown">{errors[0]}</p>
            </div>
          </Grid.Column>
        </Grid.Row>
      )
  );
};

ErrorLine.propTypes = {
  equivalentCssProperty: PropTypes.string,
  isValueValid: PropTypes.bool,
  setIsValueValid: PropTypes.func,
  theme: PropTypes.shape({}),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variableName: PropTypes.string,
};

ErrorLine.defaultProps = {
  equivalentCssProperty: 'fontSize',
  isValueValid: true,
  setIsValueValid: () => {},
  theme: {},
  type: 'text',
  value: '',
  variableName: '',
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(ErrorLine);
