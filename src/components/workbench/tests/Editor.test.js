import React from 'react';
import { Editor } from '../Editor';
import { shallow } from 'enzyme';

describe('Editor', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<Editor />) });
  it('Should render without crashing', () => {});
});