import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Card, Input, Radio } from 'semantic-ui-react';
import './style.css';

const ThemeLine = ({ initialValue, title, variableName, setEditMode }) => {
  const [value, setValue] = useState('');
  return (
    <Card>
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={10}>
              {title}: <strong>{value}</strong>
              {handleColorInfoRenderer()}
            </Grid.Column>
            <Grid.Column computer={6} className="variable-name">
              {variableName}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Value:
            </Grid.Column>
            <Grid.Column>
              <Input value={value || initialValue} onChange={(e, data) => setValue(data)} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Type:
            </Grid.Column>
            <Grid.Column>
              <Radio label="text" />
              <Radio label="em" />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => handleSave()}>
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
    if (value.toString().match(colorRegex)) {
      return (
        <svg width="15" height="15">
          <rect width="15" height="15" rx="5" ry="5" className="color-info-rect" style={{ fill: value }} />
        </svg>
      );
    }
    return '';
  }

  function handleSave () {
    setEditMode(false);
    // TODO
  }
};

ThemeLine.propTypes = {
  initialValue: PropTypes.string,
  setEditMode: PropTypes.func,
  title: PropTypes.string,
  variableName: PropTypes.string,
};

ThemeLine.defaultProps = {
  initialValue: '',
  setEditMode: () => {},
  title: '',
  variableName: '',
};

export default ThemeLine;
