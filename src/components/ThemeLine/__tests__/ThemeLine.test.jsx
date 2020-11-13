import React from 'react';
import { mount, shallow } from 'enzyme';
import ThemeLine from '../ThemeLine';

describe('Basic tests on render & mount', () => {
  it('should render without crashing', () => {
    shallow(<ThemeLine />);
  });

  it('should mount without crashing', () => {
    mount(<ThemeLine />);
  });
});
