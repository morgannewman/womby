import React from 'react'
import { Sidebar } from '../Sidebar'
import { shallow } from 'enzyme'

describe('Sidebar', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Sidebar />)
  })
  it('Should render without crashing', () => {})
})
