import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';
import ThemeLine from '../ThemeLine/ThemeLine';
import { connect } from 'react-redux';
import './style.css';

const SimpleAccordion = ({ title, index, themeLines, theme }) => {
  const [activeIndex, setActiveIndex] = useState([0, 1]);

  return (
    <Accordion fluid style={{ width: '100%' }}>
      <Accordion.Title
        active={activeIndex === index}
        className="accordion-title"
        data-testid="accordion-title"
        index={index}
        onClick={() => handleClick()}
      >
      <Icon name='dropdown' />
        {title}
      </Accordion.Title>
      <Accordion.Content
        id="accordion-content-padding"
        active={activeIndex === index}
      >
        {renderThemeLines()}
      </Accordion.Content>
    </Accordion>
  );

  function handleClick () {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  function renderThemeLines () {
    const themeLineList = [];
    themeLines.forEach((themeLine) => {
      themeLineList.push(
        <ThemeLine
          key={themeLine.variableName}
          title={themeLine.title}
          defaultValue={themeLine.defaultValue}
          themeProps={theme[themeLine.variableName]}
          equivalentCssProperty={themeLine.equivalentCssProperty}
          themeLine={themeLine}
          variableName={themeLine.variableName}
        />,
      );
    });

    return themeLineList;
  }
};

SimpleAccordion.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  theme: PropTypes.shape({}),
  themeLines: PropTypes.arrayOf(PropTypes.shape({})),
};

SimpleAccordion.defaultProps = {
  title: '',
  index: -1,
  theme: {},
  themeLines: [],
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(SimpleAccordion);
