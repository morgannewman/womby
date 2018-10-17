import React from 'react';
import { Landing } from '../Landing';
import { shallow } from 'enzyme';

describe('Landing', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<Landing />) });
  it('Should render without crashing', () => {
    wrapper;
  });
});