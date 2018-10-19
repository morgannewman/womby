import React from 'react'
import LandingPage from '../LandingPage'
import { shallow } from 'enzyme'

describe('LandingPage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<LandingPage />)
  })
  it('Should render without crashing', () => {})
})
