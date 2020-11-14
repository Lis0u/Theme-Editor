import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import SimpleAccordion from './components/Accordion/SimpleAccordion';
import { themeValues } from './helper/themeValues';
import SaveButton from './components/Button/SaveButton';
import { getTransformedValue } from './helper/themeValueGetter';
import { connect } from 'react-redux';
import store from './store';

function App ({ theme }) {
  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('theme'));
    if (localTheme) {
      store.dispatch({ type: 'UPDATE_THEME', theme: localTheme });
    }
  }, [])

  return (
    <div
      id="app-container"
      style={{
        color: getTransformedValue(theme['colors.primary'], theme),
        borderWidth: getTransformedValue(theme['sizes.borderWidth'], theme) + theme['sizes.borderWidth'].type
      }}
    >
      <h1
        id="app-title"
        style={{ fontSize: getTransformedValue(theme['sizes.h1'], theme) + theme['sizes.h1'].type }}
      >
        simple theme editor
      </h1>
      {renderThemeAccordions()}
      <SaveButton />
    </div>
  );

  function renderThemeAccordions () {
    const accordionList = [];
    themeValues.forEach((value, index) => {
      accordionList.push(
        <SimpleAccordion
          key={value.title}
          title={value.title}
          themeLines={value.themeProps}
          index={index}
        />,
      );
    })

    return accordionList;
  }
}

App.propTypes = {
  theme: PropTypes.shape({
    'colors.primary': PropTypes.shape({ value: PropTypes.string }),
    'sizes.h1': PropTypes.shape({ type: PropTypes.string }),
    'sizes.borderWidth': PropTypes.shape({ type: PropTypes.string })
  }),
};

App.defaultProps = {
  theme: {
    'colors.primary': { value: '#000000' },
    'sizes.borderWidth': { value: '', type: 'em' },
    'sizes.h1': { value: '', type: 'em' },
  },
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  }
}

export default connect(mapStateToProps)(App);
