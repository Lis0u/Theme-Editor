import React, { useEffect } from 'react';
import './App.css';
import SimpleAccordion from './components/Accordion/SimpleAccordion';
import { themeValues } from './helper/themeValues';
import SaveButton from './components/Button/SaveButton';
import store from './store';

function App () {
  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('theme'));
    if (localTheme) {
      store.dispatch({ type: 'UPDATE_THEME', theme: localTheme });
    }
  }, []);

  return (
    <div style={{ paddingTop: '50px' }}>
      <div id="app-container">
        <h1 id="app-title">
          simple theme editor
        </h1>
        {renderThemeAccordions()}
        <SaveButton />
      </div>
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

export default App;
