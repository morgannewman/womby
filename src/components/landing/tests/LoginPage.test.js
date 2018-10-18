import React from 'react';
import { LoginPage } from '../LoginPage';
import { shallow } from 'enzyme';

describe('LoginPage', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<LoginPage />) });
  it('Should render without crashing', () => {});

  it('Should embed a login form', () => {

  });
});