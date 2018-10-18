import React from 'react'
import { Toolbar } from '../Toolbar'
import { shallow } from 'enzyme'

describe('Toolbar', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Toolbar />)
  })
  it('Should render without crashing', () => {})
})
