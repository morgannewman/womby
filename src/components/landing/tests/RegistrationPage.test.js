import React from 'react';
import { RegistrationPage } from '../RegistrationPage';
import { shallow } from 'enzyme';

describe('RegistrationPage', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<RegistrationPage />) });
  it('Should render without crashing', () => {
    wrapper;
  });
});