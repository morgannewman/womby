import React from 'react';
import App from '../app/App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
});
