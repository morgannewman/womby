import React from 'react'
import ConnectedLanding, { Landing } from '../Landing'
import { Provider } from 'redux'
import { shallow, mount } from 'enzyme'

describe('Landing', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Landing />)
  })

  it('Renders without crashing', () => {})

  it('Redirects when logged in', () => {})
})
