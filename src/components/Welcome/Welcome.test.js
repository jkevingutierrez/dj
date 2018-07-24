import React from 'react';
import { shallow } from 'enzyme';
import Welcome from './Welcome';

it('renders welcome message', () => {
  const wrapper = shallow(<Welcome />);
  const welcome = <h1 className="App-title">Welcome to React</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});
