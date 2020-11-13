import React from 'react';
import './App.css';
import SimpleAccordion from './components/Accordion/SimpleAccordion';
import { themeValues } from './helper/themeValues';

function App () {
  return (
    <div id="app-container">
      <h1 id="app-title">simple theme editor</h1>
      {renderThemeAccordions()}
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
